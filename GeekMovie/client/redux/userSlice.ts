import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/user'

export type UserRedux = {
  user: {
    currentUser: User | null
    error: string | null
    loading: boolean
  }
}

const initialState: UserRedux['user'] = {
  currentUser: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateStart: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.loading = true
      state.error = null
    },
    updateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    deleteStart: (state) => {
      state.currentUser = null
      state.loading = true
      state.error = null
    },
    deleteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    deleteSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    logoutStart: (state) => {
      state.currentUser = null
      state.loading = true
      state.error = null
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    logoutSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    }
  }
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateFailure,
  deleteStart,
  deleteFailure,
  deleteSuccess,
  logoutStart,
  logoutFailure,
  logoutSuccess
} = userSlice.actions

export default userSlice.reducer
