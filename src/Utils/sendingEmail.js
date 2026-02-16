import nodemailer from "nodemailer";

const sendEmail = async ({to,subject,html})=>{

    //config of email "Sending"
    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 465 ,
        secure : true ,
        auth : {
            user : "mostafaghoniem7@gmail.com" ,
            pass : "hwkc fexy xytk pwbb"
        } ,
        tls: {
            rejectUnauthorized: false
        }
    })

    const info = await transporter.sendMail({
        from : "mostafaghoniem7@gmail.com",
        to ,
        subject,
        // text : "Hello Mostafa" ,
        html
    })

    return info.rejected.length == 0;

}

// sendEmail();

export const subject = {
    register : "Registered Email" ,
    reset : "reset"
}
export default sendEmail;