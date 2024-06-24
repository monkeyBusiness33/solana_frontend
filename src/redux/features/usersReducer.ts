import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UsersState {
  user: {
    address: string,
    isAuthority: boolean,
  },
  walletInfo: {
    publicKey: string,
    connected: boolean
  }
}

// Define the initial state using that type
const initialState: UsersState = {
  user: {
    address: '',
    isAuthority: false
  },
  walletInfo: {
    publicKey: '',
    connected: false
  },
}

export const usersReducer = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setWalletInfo: (state, action: PayloadAction<any>) => {
      state.walletInfo = action.payload;
    },
  },
})

export const { setUserInfo, setWalletInfo } = usersReducer.actions

// Other code such as selectors can use the imported `RootState` type
export default usersReducer.reducer