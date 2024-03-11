import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice.js'
import { RootState } from '~/redux/store.js'


import {useForm} from 'react-hook-form'
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

interface SignInFormTypes {
  fullName: string;
  username: string;
  password: string;
  retypePassword: string;
}
const SignUp = () => {
  const form = useForm<SignInFormTypes>()
  const {register,handleSubmit, formState :{errors}} =form

  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const onSubmit = async () => {
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/home')
    } catch (error) {
      dispatch(signInFailure(error))
    }
  }
  return (
    <div className='flex'>
    <form className="w-full sm:w-[539px] h-full sm:h-auto rounded-lg flex-col absolute bg-white p-10 bg-opacity-[75%] right-0 sm:top-[5%] sm:mr-[5%]" 
    onSubmit={handleSubmit(onSubmit)} >
      {/* head */}
        <div className="flex justify-between">
          <div className="flex">
            <p className="flex-initial text-2xl font-medium">Welcome to </p>
            <Link to="/home" className="flex-initial px-[3px] text-2xl font-medium text-orange-primary">Homez</Link>
          </div>
          <div className="flex flex-col">
            <span className="text-base">Already have an account?</span>
            <Link to="/signup" className="hover:text-[--hover-orange-primary] text-base">Sign In</Link>
          </div>
        </div>
        {/* Sign in others */}
        <h1 className="font-semibold text-5xl">Sign up</h1>
        <h4 className="mt-9 pb-3 text-base sm:text-xl">Enter your full name</h4>
        <Input className="h-14 border-[1px] hover:border-[--hover-orange-primary] pl-7 text-base sm:text-xl sm:font-normal" 
          {...register("fullName", {
              required:"Username or email is required",
              pattern:{
                value:/^[a-zA-Z]/,
                message: "Invalid name"
              },
            }, 
          )} 
          placeholder="Full name"
          id="fullName" 
          onChange={handleChange}
           />
        <p className="text-red-500">{errors.fullName?.message}</p>
        <h4 className="mt-5 pb-3 text-base sm:text-xl">Enter your username or email address</h4>
        <Input className="h-14 border-[1px] hover:border-[--hover-orange-primary] pl-7 text-base sm:text-xl sm:font-normal" 
          {...register("username", {
              required:"Username or email is required",
              pattern:{
                value:/^[a-zA-Z0-9]/,
                message: "Invalid Username"
              },
            }, 
          )} 
          placeholder="Username or email address"
          id="usernameSignUp" 
          onChange={handleChange}
           />
        <p className="text-red-500">{errors.username?.message}</p>
        
        <h4 className="pt-5 pb-3 text-base sm:text-xl">Enter your Password</h4>
        <Input className="h-14 border-[1px] hover:border-[--hover-orange-primary] pl-7 text-base sm:text-xl sm:font-normal" 
          {...register("password", 
            {
              required:"Password is required",
              minLength:6,
            }, 
          )} 
          placeholder="Password"
          type="password"
          id="passwordSignUp"
          onChange={handleChange}
           />
        <p className="text-red-500">{errors.password?.message}</p>
        <h4 className="pt-5 pb-3 text-base sm:text-xl">Retype your Password</h4>
        <Input className="h-14 border-[1px] hover:border-[--hover-orange-primary] pl-7 text-base sm:text-xl sm:font-normal" 
          {...register("retypePassword", 
            {
              required:"Password doesn't match",
              
            }
          )} 
          placeholder="Retype password"
          type="password"
          id="retypePassword"
          onChange={handleChange}
           />
        <p className="text-red-500">{errors.retypePassword?.message}</p>
{/* Submit */}
        <div className="mt-9 flex justify-end">
        <Input className="flex bg-[--orange-primary] bg-opacity-100 justify-center text-white rounded-lg h-[54px] w-[236px] text-base sm:text-xl hover:bg-[--hover-orange-primary]" 
            type="submit" value="Sign Un" />
        </div>
    </form>
    {error && <p className="mt-5 text-red-500">{error}</p>}
    </div>
  );
};

export default SignUp;
