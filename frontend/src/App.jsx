import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function Logout() {
  localStorage.clear()
  return <Navigate to='/login'/>
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register></Register>
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          }
          />
        <Route
          path="/login"
          element={
              <Login></Login>
          }
          />
        <Route
          path="/register"
          element={
            <RegisterAndLogout />
          }
          />
        <Route
        path="/logout"
        element={
          <Logout />
        }>
        </Route>
        <Route
          path="*"
          element={
              <NotFound></NotFound>
          }
          />
      </Routes>
    </BrowserRouter>
  )
}

export default App
