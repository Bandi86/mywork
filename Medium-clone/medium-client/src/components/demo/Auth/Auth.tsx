import { FcGoogle } from 'react-icons/fc'
import Modal from '../../../utils/Modal'
import { LiaTimesSolid } from 'react-icons/lia'
import { MdFacebook } from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai'
import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { signInWithPopup } from 'firebase/auth'
import { auth, db, provider } from '../../../firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import React from 'react'

interface AuthProps {
  modal: boolean
  setModal: (value: boolean) => void
}

const Auth: React.FC<AuthProps> = ({ modal, setModal }) => {
  const navigate = useNavigate()
  const [createUser, setCreateUser] = useState(false)
  const [signReq, setSignReq] = useState<string>('')

  const googleAuth = async () => {
    try {
      const createUser = await signInWithPopup(auth, provider)
      const newUser = createUser.user
      const ref = doc(db, 'users', newUser.uid)
      const userDoc = await getDoc(ref)
      if (!userDoc.exists()) {
        await setDoc(ref, {
          username: newUser.displayName,
          email: newUser.email,
          userImg: newUser.photoURL,
          bio: ''
        })
        navigate('/')
        toast.success('User have been signed in')
        setModal(false)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Modal modal={modal} setModal={setModal}>
      <section
        className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-white shadows
          ${modal ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-500`}
      >
        <button
          className="absolute top-8 right-8 text-2xl hover:opacity-50"
          onClick={() => setModal(false)}
        >
          <LiaTimesSolid />
        </button>
        <div className="flex flex-col justify-center items-center gap-[3rem]">
          {signReq === '' ? (
            <>
              <h2 className="text-2xl pt-[5rem]">{createUser ? 'Join Medium' : 'Welcome Back'}</h2>
              <div className="flex flex-col gap-4 w-fit mx-auto">
                <Button
                  icon={<FcGoogle className="text-3xl" />}
                  text={`${createUser ? 'Sign Up' : 'Sign In'} with Google`}
                  click={() => googleAuth()}
                />
                <Button
                  icon={<MdFacebook className="text-3xl text-[#4267B2]" />}
                  text={`${createUser ? 'Sign Up' : 'Sign In'} with Facebook`}
                />
                <Button
                  icon={<AiOutlineMail className="text-3xl" />}
                  text={`${createUser ? 'Sign Up' : 'Sign In'} with Email`}
                  click={() => setSignReq(createUser ? 'sign-up' : 'sign-in')}
                />
              </div>
              <div className="flex items-center gap-4">
                <p>{createUser ? 'Already have an account?' : "Don't have an account?"}</p>
                <button
                  className="text-green-700 hover:text-green-600 font-bold ml-1"
                  onClick={() => setCreateUser(!createUser)}
                >
                  {createUser ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </>
          ) : signReq === 'sign-in' ? (
            <SignIn setSignReq={setSignReq} />
          ) : (
            <SignUp setSignReq={setSignReq} />
          )}
          <p className="md:w-[30rem] mx-auto text-center text-sm mb-[3rem]">
            Click "{createUser ? 'Sign Up' : 'Sign In'}" to agree to Medium's Terms of Service and
            Privacy Policy
          </p>
        </div>
      </section>
    </Modal>
  )
}

const Button = ({
  icon,
  text,
  click
}: {
  icon?: React.ReactNode
  text: string
  click?: () => void
}) => {
  return (
    <button
      className="flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full"
      onClick={click}
    >
      {icon} {text}
    </button>
  )
}

export default Auth
