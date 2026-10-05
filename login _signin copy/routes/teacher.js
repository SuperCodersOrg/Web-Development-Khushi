const express = require("express");

const router = express.Router();

const {
    isTeacher
} = require("../middleware/auth.middleware");


router.get("/home", isTeacher, (req, res) => {

    res.redirect("/teacher.html");

});


router.get("/profile", isTeacher, (req, res) => {

    res.json({
        username: req.user.username,
        role: req.user.role
    });

});


module.exports = router;