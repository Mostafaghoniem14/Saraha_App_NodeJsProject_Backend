import Joi from "joi";
import { Types } from "mongoose";

export const MsgSchemaValidation = Joi.object({
    content : Joi.string().required(),
    sender : Joi.custom((value , helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true ;
        }
        return helper.message("Please enter valid ObjectID")
    }).required() ,
    receiver : Joi.custom((value , helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true ;
        }
        return helper.message("Please enter valid ObjectID")
    }).required()
}).required();

export const singleMessageSchema = Joi.object({
    msgID : Joi.custom((value , helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true
        }
        return helper.message("Please enter valid MessageID")
    }).required()
}).required();

export const flags = {
    inbox : "inbox" ,
    outbox : "outbox"
};

export const AllMessageSchema = Joi.object({
    flag : Joi.valid(...Object.values(flags)).required() ,
    // sender : Joi.custom((value , helper)=>{
    //     if(Types.ObjectId.isValid(value)){
    //         return true ;
    //     }
    //     return helper.message("Please enter valid ObjectID")
    // }).required() ,
    receiver : Joi.custom((value , helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true ;
        }
        return helper.message("Please enter valid ObjectID")
    }).required()
}).required();