import { Outlet } from 'react-router-dom'

import Header from './Header'

const MainLayout = () => {
  return (
    <div>
      <div className='bg-navbar-primary'>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
