const express=require('express');
const app=express();
app.get('/home',(req,res)=>{
    // res.send('homepage');
    res.send('<h1>hello</h1>');
})
app.listen(3300,()=>{
    console.log("server running");

})
