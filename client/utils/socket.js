import { io } from "socket.io-client";
const socket = io("wss://redux-gram-server.onrender.com");
export default socket;