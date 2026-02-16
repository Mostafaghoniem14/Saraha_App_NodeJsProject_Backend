import jwt from "jsonwebtoken";
import { userModel } from "../DB/Models/userModel.js";
export const userauthMWare = async(req , res , nxt)=>{

    //decode token
    const {authorization} = req.headers;
    if(!authorization){
        return res.json({msg : "token is required"});
    }
    const {id} = jwt.verify(authorization , process.env.UserJWT_Secret_Key)
    const user =await userModel.findOne({_id : id})
    req.user = user;
    nxt();

}

