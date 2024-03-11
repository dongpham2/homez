import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice.js'
import { RootState } from '~/redux/store.js'

import facebookIcon from "../../assets/icons/facebook.icon.svg"
import appleIcon from "../../assets/icons/apple.icon.svg"
import googleIcon from "../../assets/icons/google.icon.svg"

import background from "../../assets/signin-bg-img.jpg";
import logo from "../../assets/logoM.png";
import {useForm} from 'react-hook-form'
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import SignUp from "../SignUp/index.js"
interface SignInFormTypes {
  username: string;
  password: string;
}

export default function SignIn() {
  const form = useForm<SignInFormTypes>()
  const {register,handleSubmit, formState :{errors}} =form

  const [isSignUp, setIsSignUp] = useState(false);
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
  const handleForgotPass =() =>{
    navigate('/home')
  }
  
  return (
    <div className="flex">
      
      <img src={background} alt="background" className="bg-cover block overflow-hidden h-full w-full absolute bg-no-repeat z-auto" />
    <div className="hidden absolute sm:flex top-[3%] left-[2%] items-center mr-2">
      <img alt="logo" src={logo} className=" p-2 mr-2 rounded-2xl bg-orange-primary"/>
      <h3 className="text-base font-semibold sm:text-xl">Homez</h3>
    </div>
    <div className={isSignUp ? '' : 'hidden'}>
    <SignUp/>
    </div>
    
    <form className={isSignUp ?'hidden':" w-full sm:w-[539px] h-full sm:h-auto rounded-lg flex-col absolute bg-white p-10 bg-opacity-[75%] right-0 sm:top-[5%] sm:mr-[5%]" }
    onSubmit={handleSubmit(onSubmit)} >
      
      {/* head */}
        <div className="flex justify-between">
          <div className="flex">
            <p className="flex-initial text-2xl font-medium">Welcome to </p>
            <Link to="/home" className="flex-initial px-[3px] text-2xl font-medium text-orange-primary">Homez</Link>
          </div>
          <div className="flex flex-col">
            <span className="text-base">No Account?</span>
            <Link to="" className="hover:text-[--hover-orange-primary] text-base" onClick={() => setIsSignUp(!isSignUp)}>Sign In</Link>
          </div>
        </div>
        {/* Sign in others */}
        <h1 className="font-semibold text-5xl">Sign in</h1>
        <div className="flex py-14 justify-between gap-2">
          <Button  variant="light" className="flex px-14 py-4 font-medium items-center justify-center">
          <img alt="google-icon" src={googleIcon} />
            <span className="pl-2">Sign in with Google</span>
          </Button>
          <Button size="mdIcon" variant="light">
            <img alt="facebook-icon" src={facebookIcon} />
          </Button>
          <Button size="mdIcon" variant="light">
          <img alt="apple-icon" src={appleIcon} />
          </Button>
        </div>
        {/* Input */}
        {/* <Input 
          className="h-14 border-[1px] hover:border-[--hover-orange-primary] pl-7 text-base sm:text-xl sm:font-normal"
        /> */}
        <h4 className="pb-3 text-base sm:text-xl">Enter your username or email address</h4>
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
          id="email" 
          onChange={handleChange}
           />
        <p className="text-red-500">{errors.username?.message}</p>
        
        <h4 className="pt-11 pb-3 text-base sm:text-xl">Enter your Password</h4>
        <Input className="h-14 border-[1px] hover:border-[--hover-orange-primary] pl-7 text-base sm:text-xl sm:font-normal" 
          {...register("password", 
            {
              required:"Password is required"
            }
          )} 
          placeholder="Password"
          type="password"
          id="password"
          onChange={handleChange}
           />
        <p className="text-red-500">{errors.password?.message}</p>
 {/* Forgot password */}
        <div className="flex justify-end mb-10 mt-5">
          <Button onClick={handleForgotPass} className="hover:text-[--hover-orange-primary]">Forgot Password</Button>
        </div>
{/* Submit */}
        <div className="flex justify-end">
        <Input className="flex bg-[--orange-primary] bg-opacity-100 justify-center text-white rounded-lg h-[54px] w-[236px] text-base sm:text-xl hover:bg-[--hover-orange-primary]" 
            type="submit" value="Sign In" />
        </div>
    </form>
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </div>
  )
}
