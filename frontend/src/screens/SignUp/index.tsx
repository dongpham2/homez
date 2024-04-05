import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '~/components/Button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '~/components/Form'
import { Input } from '~/components/Input'
import AuthLayout from '~/Layout/AuthLayout'
import { fetchSignUp, useAppDispatch } from '~/redux/user/userSlice'
import { type ISignUpRequest } from '~/types/user.type'
import signupValidate, { signupInitValues } from '~/validate/signup/config'

const SignUp = () => {
  const dispatch = useAppDispatch()

  const form = useForm<ISignUpRequest>({
    mode: 'all',
    defaultValues: signupInitValues,
    resolver: yupResolver(signupValidate),
  })
  const onSubmit = async () => {
    try {
      const formData = form.getValues()
      await dispatch(fetchSignUp(formData))
    } catch (error) {
      console.error('Error occurred during sign up:', error)
    }
  }
  return (
    <AuthLayout funcTitle="Sign In" pageTitle="Sign Up" toPage="/signin">
      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Tên người dùng</h3>
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nhập tên người dùng" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Email</h3>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nhập email ..." {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Mật khẩu</h3>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Nhập mật khẩu ..." {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button variant="primary" size="lg" className="w-56 text-white">
              Đăng ký
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}

export default SignUp
