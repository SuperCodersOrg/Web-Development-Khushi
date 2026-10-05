const nodemailer=require("nodemailer");
const GMAIL="khushijangra566@gmail.com";
const PASS="ttaq rnuq twcq otuv";


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