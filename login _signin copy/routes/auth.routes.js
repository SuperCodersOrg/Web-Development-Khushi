const express=require("express");
const path=require("path");
const router=express.Router();
// const mongoose=require("mongoose");
// const users=require("../data/user");
const Data=require("../module/user");
const app=express();

console.log(Data);
console.log(typeof Data.findOne);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
})
router.get("/login",(req,res)=>{
     res.redirect("/login.html");
})
router.post("/delete",(req,res)=>{
    const { username, password } = req.body;
    Data.deleteOne({username:username,password:password});
    res.redirect("/home");

})
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    // const user = users.find((user) => {
    //     return (
    //         user.username === username &&
    //         user.password === password
    //     );
    // });
    // if (!user) {
    //     return res.redirect("/login");
    // }
     Data.findOne({
        username: username,
        password: password
    })
    .then((user)=>{
        // console.log(user);
        if (!user){
            return res.redirect("/login");
        }
                req.session.user = {
        username: user.username,
        role: user.role
    };
    if (user.role === "student") {
        return res.redirect("/student/home");
    }
    if (user.role === "teacher") {
        return res.redirect("/teacher/home");
    }
    })
    .catch((err) => {
            console.log(err);
            res.status(500).send("Error finding user");
        });
    
//  if (user.role === "student") {
//         return res.redirect("/student/home");
//     }
//     if (user.role === "teacher") {
//         return res.redirect("/teacher/home");
//     }
});
router.get("/signin", (req, res) => {
    res.redirect("/signin.html");
});
router.post("/signin", (req, res) => {
    const { username, password, role } = req.body;
  Data.findOne({
        username: username
    })
    .then((user)=>{
        // console.log(user);
        if (user){
            return res.redirect("/signin");
        }
    
    const newUser = new Data({
        username:username,
        password:password,
        role:role
    });
    //  console.log(newUser);
   return newUser.save()    
    .then(()=>{ console.log("inside");
        // console.log();
if (role === "student") {
     console.log("stu");
        return res.redirect("/student/home");
    }
    if (role === "teacher") {
        return res.redirect("/teacher/home");
    }
})})
  .catch((err) => {
            console.log(err);
            res.status(500).send("Error creating user");
        });
    // const existingUser = users.find((user) => {
    //    return user.username === username;
    // });
    // if (existingUser) {
    //     return res.redirect("/signin");
    // }
   

    // users.push(newUser);
    // req.session.user = {
    //     username: newUser.username,
    //     role: newUser.role
    // };
    //   if (role === "student") {
    //     return res.redirect("/student/home");
    // }
    // if (role === "teacher") {
    //     return res.redirect("/teacher/home");
    // }
});
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Logout failed");
       }
        res.redirect("/");
    });
});


module.exports = router;
