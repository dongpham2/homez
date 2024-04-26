import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button } from '~/components/Button'
import { type RootState } from '~/redux/store'

import logo from '../../assets/logoM.png'
import UserOptions from '../UserOptions'

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.authReducer)
  const [visibleOption, setVisibleOption] = useState(false)
  const toggleVisibleOption = () => {
    setVisibleOption(!visibleOption)
  }
  return (
    <div className="flex items-center justify-between border-b-2 p-4">
      <div className="flex items-center">
        <Link to="/home" className="mr-2 flex items-center">
          <img src={logo} alt="logo" className="mr-2 rounded-2xl bg-orange-primary p-2" />
          <h3 className="text-base font-semibold sm:text-xl">homez</h3>
        </Link>
        <ul className="hidden cursor-pointer items-center gap-3 text-sm font-semibold max-sm:hidden sm:text-base md:flex">
          <li>Nhà đất bán</li>
          <li>Nhà đất cho thuê</li>
          <li>Dự án</li>
          <li>Tin tức</li>
        </ul>
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
              <Button size="sm">Đăng nhập</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Đăng ký</Button>
            </Link>
            <Link to="/createPost">
              <Button variant="ghost" size="sm">
                Đăng tin
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
