const express=require("express");
const path=require("path");
const router=express.Router();
const users=require("../data/user");
router.get("/login",(req,res)=>{
     res.redirect("/login.html");
})
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => {
        return (
            user.username === username &&
            user.password === password
        );
    });
    if (!user) {
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
});
router.get("/signin", (req, res) => {
    res.redirect("/signin.html");
});
router.post("/signin", (req, res) => {
    const { username, password, role } = req.body;
    const existingUser = users.find((user) => {
       return user.username === username;
    });
    if (existingUser) {
        return res.redirect("/signin");
    }
    const newUser = {
        username,
        password,
        role
    };
    users.push(newUser);
    req.session.user = {
        username: newUser.username,
        role: newUser.role
    };
      if (role === "student") {
        return res.redirect("/student/home");
    }
    if (role === "teacher") {
        return res.redirect("/teacher/home");
    }
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
