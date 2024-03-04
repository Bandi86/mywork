import { MdKeyboardArrowLeft } from 'react-icons/md'
import Input from '../../../utils/Input'

const SignIn = ({ setSignReq }: { setSignReq: (value: string) => void }) => {
  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign in with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account
      </p>
      <form className="flex flex-col gap-4">
        <Input type="email" title="email" />
        <Input type="password" title="password" />
        <button className="px-4 py-1 text-sm rounded-full bg-green-700 hover:bg-green-600 text-white w-fit mx-auto">
          Sign In
        </button>
      </form>
      <button
        className="mt-5 text-sm text-green-600 hover:text-green-700 flex items-center mx-auto"
        onClick={() => setSignReq('')}
      >
        <MdKeyboardArrowLeft />
        All sign in options
      </button>
    </div>
  )
}

export default SignIn
