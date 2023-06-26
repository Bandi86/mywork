import React, {useContext} from 'react'
import { UserContext } from '../../contexts/UserContext'

export default function AdminHome() {
    const [user, setUser] = useContext(UserContext);
    

  return (
   <>
   {user.name}
   </> 
  )
}
