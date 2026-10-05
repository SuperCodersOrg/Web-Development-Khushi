const express = require("express");

const router = express.Router();

const {  isStudent} = require("../middleware/auth.middleware");


router.get("/home", isStudent, (req, res) => {

    res.redirect("/student.html");

});


router.get("/profile", isStudent, (req, res) => {

    res.json({
        username: req.user.username,
        role: req.user.role
    });

});


module.exports = router;