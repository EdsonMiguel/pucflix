import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignIn } from '../Pages/SignIn'
import { SignUp } from '../Pages/SignUp'
import { App } from '../Pages/App'
import { AdminMovie } from '../Pages/Admin/Movie'
import { AdminSignUp } from '../Pages/Admin/SignUp'
import { ProtectedRoute } from './ProtectedRoute'
import { AdminRoute } from './AdminRoute'

const routes = createBrowserRouter([
  {
    path: '/pucflix',
    element: <SignIn />,
  },
  {
    path: '/pucflix/signup',
    element: <SignUp />,
  },
  {
    path: '/pucflix/app',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: '/pucflix/admin',
    element: (
      <AdminRoute>
        <AdminMovie />
      </AdminRoute>
    ),
  },
  {
    path: '/pucflix/admin/singup',
    element: (
      <AdminRoute>
        <AdminSignUp />
      </AdminRoute>
    ),
  },
])

export function Routes() {
  return <RouterProvider router={routes} />
}
