import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../features/messages/messageSlice';
import axios from 'axios';


function fetchMessages() {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector((store) => store.user);


    useEffect(() => {

      async function fetchMessages() {
        try {
          if(!selectedUser){
            return
          }
          axios.defaults.withCredentials = true;
          const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/message/get-messages/${selectedUser?._id}`);
          if(!res.data){
            return
          }
          if(res.data){
             return dispatch(setMessages(res.data))
          }
          
        } catch (error) {
          console.log(error);
        }
      }
      fetchMessages()
    
    
    
    }, [selectedUser]);
    
}

export default fetchMessages;