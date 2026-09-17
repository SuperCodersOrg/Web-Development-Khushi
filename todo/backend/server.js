const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '..', 'data', 'task.json');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,DELETE,PUT,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
})
function readFileOfData() {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
    }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2))
    }
    const data = fs.readFileSync(filePath, 'utf-8')

    return JSON.parse(data || '[]');
}
function writeDataToFile(tasks, res) {
    fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'File Not Found' });
            return;
        }
        res.status(201).json({ message: 'Task stored successfully' });
    });
}
app.get('/loadTask', (req, res) => {

    try {
        const task = readFileOfData();
        const activetask = task.filter((task) => {
            return task.isdeleted!='true'
        }
        )

        res.status(200);
        res.json(activetask);
    }
    catch (err) {
        res.status(500).json(
            {error:"failed to load"})
    }
})
app.post('/addTask', (req, res) => {
    try{
    const newTask = req.body;
    let tasks = readFileOfData();
    tasks.push(newTask);
    writeDataToFile(tasks,res);}
 
    catch(err){
        res.status(500).json({error:"failed to load"})
    }
})
app.delete('/delete', (req, res) => {
    try {
        const { deleteId } = req.body;
        const data = readFileOfData();
        const task = data.find(t =>
            t.id === Number(deleteId))
        if (task) {
            task.isdeleted = 'true';
            writeDataToFile(data,res);
          
        }
        else {
            res.status(500).send('task not found');
        }
    }
    catch (err) {
        res.status(500).json({error:"failed to load"})
    }
}
)
app.patch('/stateChange', (req, res) => {
    try {
        const { Id } = req.body;
        const data = readFileOfData();
        const task = data.find(t =>
            t.id === Number(Id))
        if (task) {
            task.status = task.status==='done' ? 'pending' : 'done';
            writeDataToFile(data,res);
          
        }
        else {
            res.status(500).send('task not found');
        }
    }
    catch (err) {
        res.status(500).json({error:"failed to load"})
    }

})
app.put('/edit', (req, res) => {
    try{
    const {id,title,description} = req.body;
    const tasks = readFileOfData();
    let found=false;
    tasks.forEach(task => {
        if (task.id === Number(id)) {
            task.title = title;
            task.description = description;
            found=true;
        }
    })
    if(found){
        writeDataToFile(tasks,res);
    }
    else{
    res.status(400).send('Page not found');}}
    catch(err){
        res.status(500).json({error:'Failed to edit'})
    }
})
app.listen(3270, () => {
    console.log("SERVER RUNNING");
});


