import React, { useState, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { signIn } from './utils/api'
import { clearToken, getToken, saveToken } from './utils/auth'
import { AuthContext } from './contexts'
import { useNavigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import Loader from './components/Loader'

const App = lazy(() => import("./pages/App"))
const SignIn = lazy(() => import("./pages/SignIn"))
const Vocabulary = lazy(() => import("./pages/Vocabulary"))

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState<string>(getToken() as string)
  const handleSignIn = async (payload: FormData) => {
    try {
      const response = await signIn(payload)
      saveToken(response.data)
      setToken(getToken() as string)
      navigate("/vocabulary", { replace: true })
    } catch (e: any) {
      toast.error(e.response.data?.detail)
    }
  }
  const handleSignOut = () => {
    clearToken()
  }
  const value = {
    token,
    onSignIn: handleSignIn,
    onSignOut: handleSignOut
  }
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { token } = useAuth()
  if (!token) {
    return <Navigate to={"/signin"} replace />
  }
  return children
}


const Router = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Suspense fallback={<Loader />}><App /></Suspense>} >
          <Route path='signin' element={<Suspense fallback={<Loader />}><SignIn /></Suspense>} />
          <Route path='vocabulary' element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute>
                <Vocabulary />
              </ProtectedRoute>
            </Suspense>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default Router