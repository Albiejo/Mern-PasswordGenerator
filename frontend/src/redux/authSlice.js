import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo: localStorage.getItem('user')  
      ? JSON.parse(localStorage.getItem('user')) 
      : null,
  };


  const authSlice= createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setUserCredentials : (state,action)=>{
            state.userInfo=action.payload;
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        userLogout: (state)=>{
            state.userInfo=null;
            localStorage.removeItem('user')
            localStorage.removeItem('Token')
        }
    }
})


export const {setUserCredentials,userLogout} = authSlice.actions;

export default authSlice.reducer;