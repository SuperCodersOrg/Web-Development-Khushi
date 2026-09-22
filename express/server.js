const express = require('express');
const app = express();
const path = require("path");
const users = [
    {
        username: "khushi",
        password: "1234",
        role: "student"
    },
    {
        username: "teacher1",
        password: "1234",
        role: "teacher"
    }
];

const session = require('express-session');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(session({
    secret:"mysecretkey1234",
    resave:false,saveUninitialized:false,
    cookie:{
        httpOnly:true,
        maxAge:1000*60*10
    }
}));
function inHandler(req,res,next){
    if(req.session.user.role=== "student"){
        return res.redirect("student.html")
    }
    else if(req.session.user.role==="teacher"){
        return res.redirect("teacher.html");
    }
    else{
        return  res.json({message:"error in role",success:false});
    }
}
function isLoggedIn(req,res,next){
    if(!req.session.user.username){
        return res.redirect("/login")
    }
    next();
}
app.get("/",(req,res)=>{
    // res.send("SERVER IS RUNNING");
    // res.sendFile(path.join(__dirname, "public", "home.html"));
    res.redirect("home.html");
})
app.get("/login",(req,res)=>{
    // res.sendFile(path.join(__dirname,"public","login.html"));
    res.redirect("login.html");
})
app.post("/login",(req,res,next)=>{
    console.log(req.body);
    const username=req.body.username;
   const password=req.body.password;
   const user = users.find((user)=>{
    return user.username === username && user.password === password;
});
   if(!user)
   { return res.json({message:"Invalid username or password",success:false})}
   req.session.user = {
    username: user.username,
    role: user.role
};
console.log(req.session.user.role);
    // res.json({message:"loggin successfull",success:true});
    next();

},inHandler);
app.get("/profile",isLoggedIn,(req,res)=>{
    // res.send(`hello ${req.session.username}`);
    // res.sendFile(path.join(__dirname, "public", "profile.html"));
    res.redirect("profile.html");
})
app.get("/logout",(req,res)=>{
    // res.send("logout");
    //  res.sendFile(path.join(__dirname, "public", "home.html"));
    res.redirect("home.html");
})
app.post("/signin",(req,res,next)=>{
   const { username,password,role}=req.body;
   users.append({username:username,password:password,role:role});
   const user=users.find((user)=>{return user.username === username && user.password===password});
   if(!user)
   { return res.json({message:"Invalid username or password",success:false})}
   req.session.user = {
    username: user.username,
    role: user.role,
    }
    // res.json({message:"signin successfull",success:true});
    next();
//    res.redirect("profile.html");
},inHandler);
app.get("/signin",(req,res)=>{
    res.redirect("sigin.html");
})




app.listen(3200,()=>{
    console.log('server');
})
