const express=require("express");
const path=require("path");
const cookieParser = require("cookie-parser");
const authRouter=require("./routes/auth.routes");
const studentRouter=require("./routes/student");
const teacherRouter=require("./routes/teacher");
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.redirect("/home.html");
})
app.use("/",authRouter);
app.use("/student",studentRouter);
app.use("/teacher",teacherRouter);
app.listen(3270,()=>{
    console.log("server running");
})