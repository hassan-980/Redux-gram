import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData,deleteUser } from '../controllers/userController.js';


const userRouter = express.Router();


userRouter.get('/get-user-data',userAuth,getUserData)
userRouter.post('/delete-user',userAuth,deleteUser)
// userRouter.post('/create-post',userAuth,createPost)


export default userRouter;