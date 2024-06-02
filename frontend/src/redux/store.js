import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'



const store = configureStore({
    reducer: {
        userAuth : authReducer
    }
})

export default store