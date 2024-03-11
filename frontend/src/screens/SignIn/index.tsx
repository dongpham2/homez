// import { ChangeEvent, FormEvent, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice.js'
// import { RootState } from '~/redux/store.js'
// import OAuth from '~/components/OAuth/index.js'

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '~/components/Form'
import { Input } from '~/components/Input'
import { SignInRequest } from '~/types/user.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import AuthLayout from '~/Layout/AuthLayout'
import { Button } from '~/components/Button'
import signinValidate, { signinInitValues } from '~/validate/signin/config'

export default function SignIn() {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value,
  //   })
  // }
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   try {
  //     dispatch(signInStart())
  //     const res = await fetch('/api/auth/signin', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     })
  //     const data = await res.json()
  //     if (data.success === false) {
  //       dispatch(signInFailure(data.message))
  //       return
  //     }
  //     dispatch(signInSuccess(data))
  //     navigate('/home')
  //   } catch (error) {
  //     dispatch(signInFailure(error))
  //   }
  // }
  const form = useForm<SignInRequest>({
    mode: 'all',
    defaultValues: signinInitValues,
    resolver: yupResolver(signinValidate),
  })

  return (
    <AuthLayout label="No Account?" funcTitle="Sign Up" pageTitle="Sign In" toPage="/signup">
      <Form {...form}>
        <form className="flex flex-col gap-5">
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
            <Button variant="primary" size="lg" className="w-56 text-white">
              Đăng nhập
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
