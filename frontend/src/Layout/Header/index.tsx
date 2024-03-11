import { Button } from '~/components/Button'
import logo from '../../assets/logoM.png'
import { Link } from 'react-router-dom'
import { RootState } from '~/redux/store'
import { useSelector } from 'react-redux'

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user)

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
            <Button variant="ghost" size="sm">
              Đăng tin
            </Button>
            <Link to="/profile">
              <img
                src={currentUser?.avatar}
                alt="avatar"
                className="h-14 w-14 rounded-full bg-no-repeat object-cover"
              />
            </Link>
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
