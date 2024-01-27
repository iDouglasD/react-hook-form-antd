import { Input, InputProps } from 'antd'
import { Control, Controller } from 'react-hook-form'

interface InputFieldProps extends InputProps {
  control: Control<any>
  name: string
}

export function InputField({
  control,
  name,
  ...rest
}: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...rest}
          {...field}
        />
      )}
    />
  )
}
