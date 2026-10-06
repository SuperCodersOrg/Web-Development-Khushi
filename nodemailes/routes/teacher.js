const express = require("express");
const router = express.Router();
const {isTeacher} = require("../middleware/auth.middleware");
router.get("/home", isTeacher, (req, res) => {
    res.redirect("/teacher.html");
});
router.get("/profile", isTeacher, (req, res) => {
    res.json({
        username: req.session.user.username,
        role: req.session.user.role
    });
});
module.exports = router;