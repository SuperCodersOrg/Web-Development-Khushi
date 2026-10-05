const express=require("express");
const jwt = require("jsonwebtoken");
const path=require("path");
const router=express.Router();
const fs = require("fs");
const JWT_SECRET = "mysecretkey1234";
const userFile = path.join(__dirname, "../data/user.json");

function getdata() {
    const data = fs.readFileSync(userFile, "utf-8");
    return JSON.parse(data);
}
function savedata(users) {

    fs.writeFileSync(
        userFile,
        JSON.stringify(users, null, 4)
    );}

router.get("/login",(req,res)=>{
     res.redirect("/login.html");
})
router.post("/login", (req, res) => {

    const { username, password } = req.body;

const users=getdata();
    const user = users.find((user) => {
        return (
            user.username === username &&
            user.password === password
        );
    });
    if (!user) {
        return res.redirect("/login");
    }
     const token = jwt.sign(
    {
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: "10m"
    }
  );
//   console.log("token",token);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 10
  });
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
const users=getdata();
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
    savedata(users);
  const token = jwt.sign(
    {
      username: newUser.username,
      role: newUser.role
    },
    JWT_SECRET,
    {
      expiresIn: "10m"
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 10
  });
      if (role === "student") {
        return res.redirect("/student/home");
    }
    if (role === "teacher") {
       return res.redirect("/teacher/home");
    }
});
router.get("/logout", (req, res) => {
    res.clearCookie("token");
        res.redirect("/");
    });


module.exports = router;
