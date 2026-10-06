const nodemailer=require("nodemailer");
const GMAIL=process.env.GMAIL;
const PASS=process.env.PASS;
require('dotenv').config();
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:GMAIL,
        pass:PASS

    }
})
// transporter.verify((error, success) => {

//     if (error) {
//         console.log("Email failed");
//         console.log(error);
//     } else {
//         console.log("Email ready");
//     }

// });
module.exports=transporter;