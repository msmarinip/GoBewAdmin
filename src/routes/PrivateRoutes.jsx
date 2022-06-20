
import { Navigate } from "react-router-dom"

export const PrivateRoutes = ({ children }) => {
  const userIdAdmin = sessionStorage.getItem('userId')

  // console.log(userIdAdmin)
  
    return !!userIdAdmin
      ?  children
      :  <Navigate to='/login' />
      
}

