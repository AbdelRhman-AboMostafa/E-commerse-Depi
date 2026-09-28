import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../Context/userContext'
import Loader from '../Loader/Loader'

export default function ProtectedRoutes({ children }) {

  const { userToken, loading } = useContext(UserContext)

  if (loading) {
    return (
      <Loader/>
    )
  }

  // if (!userToken) {
  //   return <Navigate to="/login" replace />
  // }

  return children
}