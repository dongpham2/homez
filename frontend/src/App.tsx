import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import CreatePost from '~/screens/CreatePost'

import Loading from './components/Loading'
import MainLayout from './Layout'
import { type RootState } from './redux/store'
import About from './screens/About'
import Home from './screens/Home'
import NotFound from './screens/notFound'
import Profile from './screens/Profile'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useSelector((state: RootState) => state.user)

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
      {
        path: 'createPost',
        element: (
          <ProtectedRoute>
            <CreatePost />
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
