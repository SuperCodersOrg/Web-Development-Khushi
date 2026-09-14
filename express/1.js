const path = require('path');
// const http =require('http');
// const fs = require('fs');
// const port=3270;
// const datafile=path.join(__dirname,'datafile.json');

const express=require('express');
const app=express();

// app.get('/home',(req,res)=>{
//     // res.send('homepage');
//     res.send('<h1>hello</h1>');
// })


app.get('/style.css',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'style.css'));
})
app.get('/',(req,res)=>{
           res.sendFile(path.join(__dirname,'frontend','index.html'
        //     ,(err) => {
        // if (err) {
        //     console.error(err);
        //     res.status(500).send('File not found');
        // }}
           
            ))
        })
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'about.html'));
})
app.get('/placement',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'placement.html'));
})
    app.get('/courses',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'courses.html'));
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'contact.html'));
})
app.get('/courses/bca',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'bca.html'));
})
app.get('/courses/btech',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'btech.html'));
})
app.get('/facilities',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'facilities.html'));
})
app.get('/students',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'students.html'));
})
app.post('/students',(req,res)=>{
    let data =req.body;
    console.log(data);
})    
    
app.listen(3270,()=>{
    console.log("server running");

})

