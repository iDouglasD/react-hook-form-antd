import { Select, SelectProps } from 'antd'
import { Control, Controller } from 'react-hook-form'

interface InputSelectFieldProps extends SelectProps {
  control: Control<any>
  name: string
  options: {
    value: string | number
    label: string
    title?: string
  }[]
}

export const InputSelect = ({
  control,
  name,
  options,
  ...rest
}: InputSelectFieldProps) => {

  const removeAccents = (text: string) => {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  const filterOptions = (input: string, option?: { label: string; value: string | number }) => {
    const label = removeAccents((option?.label ?? ''))
    const inputText = removeAccents(input)
    return label.includes(inputText);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...rest}
          {...field}
          showSearch
          filterOption={filterOptions}
          options={options}
        />
      )}
    />
  )
}
