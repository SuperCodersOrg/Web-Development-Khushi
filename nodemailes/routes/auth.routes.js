const express = require("express");
const path = require("path");
const fs = require("fs");
const transporter = require("../config/mail");
const router = express.Router();
const users = require("../data/user");
const cors = require("cors");
const crypto = require("crypto");
const userFile = path.join(__dirname, "../data/user.json");
function getdata() {
    const data = fs.readFileSync(userFile, "utf-8");
    return JSON.parse(data);
}
function savedata(users) {

    fs.writeFileSync(
        userFile,
        JSON.stringify(users, null, 4)
    );
}

router.get("/login", (req, res) => {
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
router.get("/forgot-password", (req, res) => {
    res.redirect("/forgot_password.html");
})
router.post("/forgot-password", (req, res) => {
    const { email,role } = req.body;
    const users = getdata();
    const user = users.find(
        user =>{ user.email === email && user.role===role }

    );
    if (!user) {
        return res.send("Email is not registered");
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    req.session.resetToken = resetToken;
    req.session.resetEmail = email;
    req.session.resetExpires =
        Date.now() + 10 * 60 * 1000;
    // console.log("token:", resetToken);
    // console.log("email:", email);
    // console.log("Expires:", req.session.resetExpires);
    const resetLink =
        `http://localhost:3270/reset-password/${resetToken}`;
    // res.send("Reset token generated");
    const mailOptions = {
        from: "khushijangra566@gmail.com",
        to: email,
        subject: "Password Reset",
        html: `
            <h2>Password Reset</h2>
            <p>You requested to reset your password.</p>
            <p>Click the link below:</p>
            <a href="${resetLink}">
               Reset Password
           </a>
            <p>This link will expire in 10 minutes.</p>
        `
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log("Email sending failed");
            return res.send("Failed to send reset email");
        }
        console.log("Email sent successfully");
        res.send("Password reset link sent to your email");
    });
});
router.get("/reset-password/:token", (req, res) => {
    const token = req.params.token;
    if (!req.session.resetToken) {
        return res.status(400).send("NO PASSWORD REQUEST FOUND");
    }
    if (token != req.session.resetToken) {
        return res.status(400).send("Invalid Token")
    }
    if (Date.now() > req.session.resetExpires) {
        delete req.session.resetToken;
        delete req.session.resetEmail;
        delete req.session.resetExpires;
        return res.status(400).send("Reset token has expired");
    }
    res.redirect(`/reset.password.html?token=${token}`);
})

router.post("/reset-password", (req, res) => {
    const { password, confirmPassword, token } = req.body
    if (!req.session.resetToken) {
        return res.status(400).send("NO PASSWORD REQUEST FOUND");
    }
    if (token != req.session.resetToken) {
        return res.status(400).send("Invalid Token")
    }
    if (Date.now() > req.session.resetExpires) {

        delete req.session.resetToken;
        delete req.session.resetEmail;
        delete req.session.resetExpires;
        return res.status(400).send("Reset token has expired");
    }
    if (password !== confirmPassword) {
        return res.send(
            "Passwords do not match"
        );
    }
    const user = users.find(
        user => user.email === req.session.resetEmail
    );

    if (!user) {
        return res.status(404).send(
            "User not found"
        );
    }
    user.password = password;
    savedata(users);
    delete req.session.resetToken;
    delete req.session.resetEmail;
    delete req.session.resetExpires;
    res.redirect("/login");
})
router.get("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.status(500).send("Logout failed");
        }
        res.redirect("/");
    });
});


module.exports = router;
