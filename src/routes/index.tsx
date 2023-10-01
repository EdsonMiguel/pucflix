import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignIn } from '../Pages/SignIn'
import { SignUp } from '../Pages/SignUp'

const routes = createBrowserRouter([
  {
    path:'/',
    element: <SignIn />
  },
  {
    path:'/signup',
    element: <SignUp />
  }
])

export function Routes(){
  return (
    <RouterProvider router={routes}/>
  )
}