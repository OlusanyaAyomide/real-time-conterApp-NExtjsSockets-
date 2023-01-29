import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error:null,
    isAuthenticated:false,
    loading:false,
    registered:false,
    sessionloading:true
}

const AuthSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        setLoading(state,action){
            state.loading = true
        },
        setSession(state,action){
            console.log("Seting session to",action.payload)
            state.sessionloading = action.payload
        }
    }
})





export default AuthSlice.reducer
export const authActions = AuthSlice.actions