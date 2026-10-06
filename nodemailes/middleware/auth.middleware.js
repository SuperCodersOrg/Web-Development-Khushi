function isLoggedIn(req,res,next){
    if(!req.session.user){
        return res.redirect("/login");
    }
    next();
}
function isStudent(req,res,next){
    if(!req.session.user){
        return res.redirect("/login");
    }
    if(req.session.user.role!=="student"){
        return res.status(403).send("access denied student only");
    }
    next();
}
function isTeacher(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    if (req.session.user.role !== "teacher") {
        return res.status(403).send(
            "Access denied. Teacher only."
        );
    }
    next();
}
module.exports = {
    isLoggedIn,
    isStudent,
    isTeacher
};