import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react'

interface BlogContextProps {
  currentUser: boolean
  setCurrentUser: React.Dispatch<React.SetStateAction<boolean>>
}

interface ContextProps {
  children: ReactNode
}

const initialState = false

const BlogContext = createContext<BlogContextProps | undefined>(
  undefined
)

const Context = ({ children }: ContextProps) => {
  const [currentUser, setCurrentUser] = useState(initialState)

  return (
    <BlogContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </BlogContext.Provider>
  )
}

export default Context

export const useBlogContext = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error(
      'useBlogContext must be used within a BlogContextProvider'
    )
  }
  return context
}
