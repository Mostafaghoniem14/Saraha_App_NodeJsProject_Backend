import { userModel } from "../../DB/Models/userModel.js";
import CryptoJS from "crypto-js";
import bcrybt from "bcrypt";

const getUsers = async(req , res , nxt)=>{
    try{
    //dcrypt phone
    const {user} = req;
   user.phone = CryptoJS.AES.decrypt(user.phone , process.env.Phone_Private_Key).toString(CryptoJS.enc.Utf8)
    return res.json({msg : "GET user with token successfully" ,User : user  })}
    catch(err){
    return nxt({
        msg : "error",
        error : err.message
    })
}
}

const updateProfile = async(req , res , nxt)=>{
try{
    const {_id} = req.query
    const user = await userModel.findById(_id)
    if(!user){
        return nxt(new Error("User NotFound"))
    }
    const UpdatedUser = await userModel.findOneAndUpdate({_id} , {...req.body} , {new : true})
    res.json({msg : "User Updated Successfully ✔" , user})
}catch(err){
    res.nxt(err);
}
}

const changePass = async(req , res , nxt)=>{
    const {email , currentPass , newPass} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return nxt(new Error("User notFound..!!"))
    }
    const matchPass =await bcrybt.compare(currentPass , user.password);
    if(!matchPass){
        return nxt(new Error("Password not match..!"))
    }
    const hashPass =await bcrybt.hash(newPass , parseInt(process.env.Salt_Rounds))
    user.password = hashPass;
    await user.save();
    return res.json({msg : "Password changed succesfully ✔" , user})
}

const uploadFile = (req , res, nxt)=>{
    return res.json({msg : "File uploaded successfully" , uploadFile});
}
export{
    getUsers ,
    updateProfile ,
    changePass ,
    uploadFile
}