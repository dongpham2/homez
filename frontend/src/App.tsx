import { Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom'
import NotFound from './screens/notFound'
import Loading from './components/Loading'
import SignIn from './screens/SignIn'
import MainLayout from './Layout'
import Home from './screens/Home'
import About from './screens/About'
import Profile from './screens/Profile'
import SignUp from './screens/SignUp'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const location = useLocation()
  // const getUserRecoil = useRecoilValue(userState) as User['user'] | null

  // const path = location.pathname

  // if (getUserRecoil && !getUserRecoil.access_token) {
  //   return <Navigate to="/login" replace />
  // }

  // if (path.startsWith('/admin') && getUserRecoil?.data?.role !== ADMIN) {
  //   return <Navigate to="/login" replace />
  // }

  // if (path.startsWith('/shop') && getUserRecoil?.data?.role !== OWNER) {
  //   return <Navigate to="/login" replace />
  // }

  return children
}

const router = createBrowserRouter([
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/',
    element: (
      // <ProtectedRoute>
      <MainLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
])

const NestedApp = () => {
  return <RouterProvider router={router} />
}

const App = () => {
  return (
    <div data-testid="app">
      <Suspense fallback={<Loading />}>
        <NestedApp />
      </Suspense>
    </div>
  )
}

export default App
