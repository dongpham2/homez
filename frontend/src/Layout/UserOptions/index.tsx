import { Link, useNavigate } from 'react-router-dom'

import personalIcon from '~/assets/personal-infor-icon.svg'
import userIcon from '~/assets/user-icon.svg'
import { fetchSignOut, useAppDispatch } from '~/screens/Account/authSlice'

const userOptionChoices = [
  {
    icon: personalIcon,
    title: 'Quản lý tin đăng',
    to: '/createPost',
  },
  {
    icon: userIcon,
    title: 'Thông tin cá nhân',
    to: 'profile',
  },
  {
    icon: userIcon,
    title: 'Thay đổi mật khẩu',
    to: '/',
  },
]

const UserOptions = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleSignOut = async () => {
    await dispatch(fetchSignOut())
    navigate('/signin')
  }
  return (
    <div className="auto-auto box-shadow-0 text-gray-color animation-toggleOptions-0.3s ease transition-all-0.3s ease will-change-opacity opacity transition-mr-10 absolute inset-auto z-50 m-0 -mb-32 flex min-w-[220px] translate-x-[-10px] translate-y-[90px] transform transform overflow-hidden rounded-10 bg-white p-9 px-4 py-4">
      <ul className="flex flex-col gap-4">
        {userOptionChoices.map((item) => (
          <Link to={item.to} key={item.title}>
            <li className="flex cursor-pointer items-center gap-3">
              <img src={item.icon} alt="icon" className="h-5 w-5" />
              <div className="font-normal">{item.title}</div>
            </li>
          </Link>
        ))}
        <button className="flex cursor-pointer items-center gap-3" type="button" onClick={handleSignOut}>
          Đăng xuất
        </button>
      </ul>
    </div>
  )
}

export default UserOptions
