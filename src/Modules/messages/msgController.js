import { msgModel } from "../../DB/Models/msgModel.js";
import { userModel } from "../../DB/Models/userModel.js";
import { flags } from "./msgValidator.js";

const createMessage = async(req , res , nxt)=>{
    try{
        //create message : 
        const {content , sender , receiver} = req.body
        const user = await userModel.findById(receiver);
        if(!user){
            return nxt(new Error("User not found"));
        }
        //User exist
        const msg = await msgModel.create({
            content ,
            sender ,
            receiver
        })
       return res.json({message : "Message is sent successfully" , msg})
    }catch(err){
        res.json({msg : err});
    }
}

const getMessage = async(req , res , nxt)=>{
    try{
        const {msgID} = req.params;
        const msg = await msgModel.findById(msgID).populate([
            {path : "sender" , select : "username , email , -_id"},
            {path : "receiver" , select : "username , email , -_id"},


        ]);
        if(!msg){
            return nxt(new Error("message not found"));
        }
        return res.json({message : "Message got successfully✔" , msg});
    }catch(err){
        return nxt(err);
    }
}

const getAllMessages = async(req , res , nxt)=>{
    try{
        const {flag , sender , receiver} = req.body;
        let message;
        if(flag == flags.inbox){
            message = await msgModel.find({receiver})
        }
        else if(flag == flags.outbox){
            message = await msgModel.find({sender})
        }
        return res.json({msg : "Messages got successfully ✔" , message});
    }catch(err){
        return nxt(err);
    }
}

export {
    createMessage ,
    getMessage ,
    getAllMessages
}