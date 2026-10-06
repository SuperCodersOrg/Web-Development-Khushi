const express=require("express");
const router=express.Router();
const app=express();

router.get('/',(req,res)=>{
    res.send('teacher portal');
})
router.get('/info',(req,res)=>{
    res.send('teacher notification');
})
router.exports=router;

// to get them use middleware app.use()
// const studentroutes=require('./routes/student'); bacially path then app.use('path  /student',filename  studentroutes)  /student is base route
app.use((req,res,next)=>{
    next();
})
// with path  specific
app.use('./path',(req,res,next)=>{
    next();
})
// with route handling
app.get('/user/:id',)