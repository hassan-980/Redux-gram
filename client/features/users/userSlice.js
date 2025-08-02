import {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"user",
    initialState:{
       
        otherUsers:null,
        selectedUser:null,
        onlineUsers:[],
        socket:null
    },
    reducers:{
        setOtherUsers:(state, action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        },
        setSocket:(state,action)=>{
            state.socket = action.payload;
        }
    }
});
export const {setAuthUser,setOtherUsers,setSelectedUser,setOnlineUsers,setSocket} = userSlice.actions;
export default userSlice.reducer;