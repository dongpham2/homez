import { Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom'
import NotFound from './screens/notFound'
import Loading from './components/Loading'
import SignIn from './screens/SignIn'
import MainLayout from './Layout'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

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
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<Loading />}>
            <NestedApp />
          </Suspense>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App
