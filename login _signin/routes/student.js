const express = require("express");
const router = express.Router();
const { isStudent} = require("../middleware/auth.middleware");
router.get("/home", isStudent, (req, res) => {
    res.redirect("/student.html");
});
router.get("/profile", isStudent, (req, res) => {
    res.json({
        username: req.session.user.username,
        role: req.session.user.role
    });
});


module.exports = router;