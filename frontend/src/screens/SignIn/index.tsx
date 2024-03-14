// import { ChangeEvent, FormEvent, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice.js'
// import { RootState } from '~/redux/store.js'
// import OAuth from '~/components/OAuth/index.js'

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '~/components/Form'
import { Input } from '~/components/Input'
import { ISignInRequest } from '~/types/user.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import AuthLayout from '~/Layout/AuthLayout'
import { Button } from '~/components/Button'
import signinValidate, { signinInitValues } from '~/validate/signin/config'
import { fetchSignIn, useAppDispatch } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const form = useForm<ISignInRequest>({
    mode: 'all',
    defaultValues: signinInitValues,
    resolver: yupResolver(signinValidate),
  })

  const onSubmit = () => {
    const formData = form.getValues()
    dispatch(fetchSignIn(formData))
  }

  return (
    <AuthLayout label="No Account?" funcTitle="Sign Up" pageTitle="Sign In" toPage="/signup">
      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
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
          <p className="flex cursor-pointer justify-end font-medium">Quên mật khẩu?</p>
          <div className="mt-3 flex justify-end">
            <Button type="submit" variant="primary" size="lg" className="w-56 text-white">
              Đăng nhập
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
