import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import backgroundImg from '~/assets/signin-bg.jpg'
import OAuth from '~/components/OAuth'

interface AuthLayoutProps {
  children: ReactNode
  label?: string
  funcTitle: string
  pageTitle: string
  toPage: string
}

const AuthLayout = ({ children, label, funcTitle, pageTitle, toPage }: AuthLayoutProps) => {
  return (
    <div>
      <img
        src={backgroundImg}
        alt="backgroundImg"
        className="absolute block h-screen w-full overflow-hidden bg-cover bg-no-repeat"
      />
      <div className="absolute right-0 flex max-w-[539px] flex-col rounded-xl border border-black bg-white bg-opacity-[75%] p-10 sm:top-[5%] sm:mr-[5%]">
        <div className="flex justify-between">
          <div className="flex">
            <p className="flex-initial text-2xl font-medium">Welcome to </p>
            <Link to="/home" className="flex-initial px-[3px] text-2xl font-medium text-orange-primary">
              Homez
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-base">{label}</span>
            <Link to={toPage} className="text-base hover:text-[--hover-orange-primary]">
              {funcTitle}
            </Link>
          </div>
        </div>
        <div>
          <h4 className="mt-3 text-4xl font-medium sm:text-5xl">{pageTitle}</h4>
        </div>
        <OAuth />

        <div>{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
