import { Button } from '~/components/Button'
import logo from '../../assets/logoM.png'
import { Link } from 'react-router-dom'
import { RootState } from '~/redux/store'
import { useSelector } from 'react-redux'
import UserOptions from '../UserOptions'
import { useState } from 'react'

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user)
  const [visibleOption, setVisibleOption] = useState(false)

  const toggleVisibleOption = () => {
    setVisibleOption(!visibleOption)
  }
  return (
    <div className="flex items-center justify-between p-4 border-b-2">
      <div className="flex items-center">
        <Link to="/home" className="flex items-center mr-2">
          <img src={logo} alt="logo" className="p-2 mr-2 rounded-2xl bg-orange-primary" />
          <h3 className="text-base font-semibold sm:text-xl">homez</h3>
        </Link>
        <ul className="items-center hidden gap-3 text-sm font-semibold cursor-pointer max-sm:hidden sm:text-base md:flex">
          <li>Nhà đất bán</li>
          <li>Nhà đất cho thuê</li>
          <li>Dự án</li>
          <li>Tin tức</li>
        </ul>
      </div>
      <div className="flex gap-2">
        {Object.keys(currentUser).length ? (
          <div className="flex items-center object-cover gap-8">
            <Button variant="ghost" size="sm">
              Đăng tin
            </Button>
            <div onClick={toggleVisibleOption} className="cursor-pointer">
              {currentUser?.avatar ? (
                <img
                  src={currentUser?.avatar}
                  alt="avatar"
                  className="object-cover w-12 h-12 bg-no-repeat rounded-full"
                />
              ) : (
                <img
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  alt="avatar"
                  className="object-cover w-12 h-12 bg-no-repeat rounded-full"
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
            <Button variant="ghost" size="sm">
              Đăng tin
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
