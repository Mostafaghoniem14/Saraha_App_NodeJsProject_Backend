import { userModel } from "../../DB/Models/userModel.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import sendEmail, { subject } from "../../Utils/sendingEmail.js";
import { sendingEmail_template } from "../../Utils/sendEmail_template.js";
const register = async (req, res, nxt) => {
  try {
    const { username, email, password, confirmPassword, phone } = req.body;
    //check password
    if (password != confirmPassword) {
      //return res.json({msg : "Wrong password"});
      return nxt(new Error("Wrong password"));
    }
    // check email
    const userCheck = await userModel.findOne({ email });
    if (userCheck) {
      //return res.json({msg : "This email is already exist"});
      return nxt(new Error("This email is already exist"));
    }

    // hashing password
    const HashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.Salt_Rounds) /*salt rounds*/
    );

    //hashing phone
    const encryptPhone = CryptoJS.AES.encrypt(
      phone,
      process.env.Phone_Private_Key
    ).toString();

    const user = await userModel.create({
      username,
      email,
      password: HashedPassword,
      phone: encryptPhone,
    });
    // Sending Email "step(1) -Token-"
    const token = jwt.sign({ email }, process.env.Email_Key);
    const verify_link = `http://localhost:2000/auth/active_account/${token}`;
    await sendEmail({
      to: email,
      subject: subject.register,
      html: sendingEmail_template(verify_link),
    });
    res.json({ msg: "User is Created", USer: user });
  } catch (err) {
    console.error("Registration error:", err);
    // return res.status(500).json({
    //     msg: "error",
    //     error: err.message,
    //     stack: err.stack
    // });
    return nxt({
      msg: "error",
      error: err.message,
      stack: err.stack,
    });
  }
};

//____________________________________________________________

const login = async (req, res, nxt) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      //return res.json({msg : "please check your email and password again"})
      return nxt(new Error("please check your email and password again"));
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      //return res.json({msg : "password doesnt match"})
      return nxt(new Error("password doesnt match"));
    }
    user.phone = CryptoJS.AES.decrypt(
      user.phone,
      process.env.Phone_Private_Key
    ).toString(CryptoJS.enc.Utf8);
    //generate token
    const token = jwt.sign({ id: user._id }, process.env.UserJWT_Secret_Key);
    return res.json({
      msg: "Token generated successfully",
      user_id: user._id,
      Token: token, 
      User : user
    });
  } catch (err) {
    //return res.json({msg: "Failed to login" , Error : err})
    return nxt({
      msg: "Failed to login",
      Error: err.message,
    });
  }
};

//____________________________________________________________

const activate_account = async (req, res, nxt) => {
  try {
    const { token } = req.params;
    const { email } = jwt.verify(token, process.env.Email_Key);
    const user = await userModel.findOne({ email });
    if (!user) {
      //return   res.json({msg : "User is not found"})
      return nxt(new Error("User is not found"));
    }
    if (user.confirmEmail == true) {
      //return res.json({msg : "User is already activated"});
      return nxt(new Error("User is already activated"));
    }
    user.confirmEmail = true;
    await user.save();
    return res.json({ msg: "User activated successfully ✔" });
  } catch (err) {
    return nxt({ msg: "Login Error", Error: err.message });
  }
};
export { register, login, activate_account };
