import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '~/components/Button'
import { type RootState } from '~/redux/store'

import logo from '../../assets/logoM.png'
import UserOptions from '../UserOptions'

const navbarItem = [
  {
    pathname: "/sell",
    route: "Nhà đất bán",
  },
  {
    pathname: "/rent",
    route: "Nhà đất cho thuê",
  },
  {
    pathname: "/project",
    route: "Dự án",
  },
  {
    pathname: "/news",
    route: "Tin tức",
  },
];

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.authReducer)
  const [visibleOption, setVisibleOption] = useState(false)

  const location = useLocation();

  const toggleVisibleOption = () => {
    setVisibleOption(!visibleOption)
  }
  return (
    <div className="flex items-center justify-between border-b-2 p-3">
      <div className="flex items-center">
        <Link to="/home" className="mr-2 flex items-center">
          <img src={logo} alt="logo" className="mr-1 rounded-xl p-1" />
          <h3 className="text-base font-semibold sm:text-xl">Estatery</h3>
        </Link>
      </div>
      <div className='md:flex justify-between gap-5 hidden'>
        {navbarItem.map((routeName, index) => (
          <Link to={routeName.pathname} key={index} className={`cursor-pointer font-semibold ${location.pathname === routeName.pathname ? ' border border-b-red-600' : ''}`}>{routeName.route}</Link>
        ))}
      </div>
      <div className="flex gap-2">
        {currentUser ? (
          <div className="flex items-center gap-8 object-cover">
            <Link to="/createPost">
              <Button variant="ghost" size="sm">
                Đăng tin
              </Button>
            </Link>
            <div onClick={toggleVisibleOption} className="cursor-pointer">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  className="h-12 w-12 rounded-full bg-no-repeat object-cover"
                />
              ) : (
                <img
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  alt="avatar"
                  className="h-12 w-12 rounded-full bg-no-repeat object-cover"
                />
              )}
            </div>
            {visibleOption ? <UserOptions /> : ''}
          </div>
        ) : (
          <>
            <Link to="/signin">
              <Button variant="ghost" size="sm">Đăng nhập</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">Đăng ký</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
