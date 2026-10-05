const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey1234";
function verifyToken(req,res,next){
    const token=req.cookies.token;
    // console.log(req.cookies);
    if(!token){
        return res.redirect("/login");
    }
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        // console.log(" decodec  ",decoded);
        req.user=decoded;
        next();
    }
    catch(e){
        res.clearCookie("token");
        return res.redirect("/login");
    }
}
function isStudent(req,res,next){
    verifyToken(req, res, () => {

        if (req.user.role !== "student") {
            return res.status(403).send("Access denied. Student only.");
        }
    })
    next();
}
function isTeacher(req, res, next) {

    verifyToken(req, res, () => {

        if (req.user.role !== "teacher") {
            return res.status(403).send("Access denied. Teacher only.");
        }

        next();

    });

    next();
}
module.exports = {
verifyToken,
    isStudent,
    isTeacher
};