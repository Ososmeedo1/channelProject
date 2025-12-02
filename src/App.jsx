import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import CategoryProducts from './Components/CategoryProducts/CategoryProducts.jsx'
import AllProducts from './Components/AllProducts/AllProducts.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'

export default function App() {


  const routering = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "products/:category", element: <ProtectedRoute><CategoryProducts /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><AllProducts /></ProtectedRoute> }
      ]
    }
  ])

  return <>
    <RouterProvider router={routering}></RouterProvider>
  </>
}
