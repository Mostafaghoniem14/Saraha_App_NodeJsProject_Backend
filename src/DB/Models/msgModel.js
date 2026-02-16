import mongoose , {Schema, Types} from "mongoose";

const msgSchema = new Schema({
    content : {
        type : String,
        required : true
    } , 
    sender : {
        type : Types.ObjectId , 
        ref : "User" ,
        required : true
    },
    receiver : {
        type : Types.ObjectId , 
        ref : "User" ,
        required : true
    }
}) 

export const msgModel = mongoose.model("messages" , msgSchema);