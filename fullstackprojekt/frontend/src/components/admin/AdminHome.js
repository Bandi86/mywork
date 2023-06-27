import React, {useContext} from 'react'
import { UserContext } from '../../contexts/UserContext'

export default function AdminHome() {
    const [user, setUser] = useContext(UserContext);
    

  return (
   <>
   <p className='text-center text-5xl mt-10'> Hello {user.name}</p>
   </> 
  )
}
