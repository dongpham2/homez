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
import { RootState } from './redux/store'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const location = useLocation()
  const currentUser = useSelector((state: RootState) => state.user)
  // const getUserRecoil = useRecoilValue(userState) as User['user'] | null

  // const path = location.pathname

  if (currentUser && !currentUser) {
    return <Navigate to="/signin" replace />
  }

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
    element: <MainLayout />,
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
        element: (
          <ProtectedRoute>
            <Profile />,
          </ProtectedRoute>
        ),
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
