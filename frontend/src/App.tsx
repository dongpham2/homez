import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import Loading from '~/components/Loading'
import MainLayout from '~/Layout'
import { type RootState } from '~/redux/store'
import About from '~/screens/About'
import SignIn from '~/screens/Account/SignIn'
import SignUp from '~/screens/Account/SignUp'
import CreatePost from '~/screens/CreatePost'
import Home from '~/screens/Home'
import ListPosts from '~/screens/ListPost'
import NotFound from '~/screens/notFound'
import PostDetail from '~/screens/PostDetail'
import Profile from '~/screens/Profile'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useSelector((state: RootState) => state.authReducer)
  if (currentUser.currentUser === null) {
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
        path: 'list-post',
        element: <ListPosts />,
      },
      {
        path: 'post-detail/:id',
        element: <PostDetail />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'createPost',
        element: <CreatePost />,
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
