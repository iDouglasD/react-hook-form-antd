import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Col, Divider, Row } from 'antd'
import { rolesOptions } from '../../helper/roles'
import { InputField } from '../../components/Inputs/InputField'
import { InputSelect } from '../../components/Inputs/InputSelect'
import { ErrorMsg } from '../../components/ErrorMsg'

const newUserFormValidationSchema = zod.object({
  name: zod.string({ required_error: "Name is required" }).min(1, { message: "Name is required" }),
  role: zod.string({ required_error: "Role is required" }).min(1, { message: "Role is required" }),
  email: zod.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
  email_confirmation: zod.string({ required_error: "Email confirmation is required" }).email({ message: "Invalid email address" })
}).refine((fildsData) => fildsData.email === fildsData.email_confirmation, {
  message: "Emails don't match",
  path: ["email_confirmation"],
});

type NewUserFormData = zod.infer<typeof newUserFormValidationSchema>

export const Home = () => {
  const newUserForm = useForm<NewUserFormData>({
    resolver: zodResolver(newUserFormValidationSchema)
  })

  const { control, formState: { errors }, handleSubmit } = newUserForm

  const handleCreateNewUser = (data: NewUserFormData) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(handleCreateNewUser)}>
      <Row className="flex justify-center mb-6" gutter={15}>
        <Divider>New User Registration Form</Divider>
        <Col xs={20} md={8} span={3}>
          <InputField
            placeholder="Full name"
            title="Full name"
            control={control}
            name="name"
            size="large"

          />
          {errors.name?.message && (
            <ErrorMsg msg={errors.name.message} />
          )}
        </Col>
        <Col xs={20} md={8} span={3}>
          <InputSelect
            className="w-full"
            size="large"
            control={control}
            name="role"
            placeholder="Select a role"
            title="Select a role"
            options={rolesOptions}
          />
          {errors.role?.message && (
            <ErrorMsg msg={errors.role.message} />
          )}
        </Col>
      </Row>
      <Row className="flex justify-center mb-6" gutter={15}>
        <Col xs={20} md={8} span={3}>
          <InputField
            placeholder="Enter your email"
            title="Enter your email"
            control={control}
            name="email"
            size="large"
          />
          {errors.email?.message && (
            <ErrorMsg msg={errors.email.message} />
          )}
        </Col>
        <Col xs={20} md={8} span={3}>
          <InputField
            placeholder="Confirm your email"
            title="Confirm your email"
            control={control}
            name="email_confirmation"
            size="large"
          />
          {errors.email_confirmation?.message && (
            <ErrorMsg msg={errors.email_confirmation.message} />
          )}
        </Col>
      </Row>
      <div className="flex justify-center mt-2">
        <button
          className='bg-blue-400 hover:bg-opacity-80 hover:text-slate-100 p-1 pr-5 pl-5 rounded-2xl text-white font-bold'
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
}