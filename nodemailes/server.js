const express=require("express");
const path=require("path");
const session=require("express-session");
const authRouter=require("./routes/auth.routes");
const studentRouter=require("./routes/student");
const teacherRouter=require("./routes/teacher");
const app=express();
// require("./config/mail");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret:"mysecretkey1234",
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        maxAge:1000*60*10
    }
}))
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