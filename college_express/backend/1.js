const path = require('path');
const fs = require('fs');
const datafile = path.join(__dirname, 'datafile.json');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        req.sendStatus(200);
        return;
    }
    next();
})
function sendData(fileName, res) {
    const filePath = path.join(__dirname, '..', 'data', fileName);
    if (!fs.existsSync(fullPath))
         { res.statusCode = 404; 
        res.end('PAGE NOT FOUND');
         return; }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(
                'File not found'
            );
        }
        try { res.json(JSON.parse(data)); }
        catch {
            res.status(500).end('invalid json');
        }


    });
}
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')
        , (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }
        }

    )
   })
app.get('/home', (req, res) => {
    sendData('home.json', res);
})
app.get('/about', (req, res) => {
    sendData('about.json', res);
})
app.get('/placement', (req, res) => {
      sendData('placement.json', res);
})
app.get('/courses', (req, res) => {
     sendData('courses.json', res);
})
app.get('/contact', (req, res) => {
      sendData('contact.json', res);
})
app.get('/courses/:courseName', (req, res) => {
    const course = req.params.courseName;    
    sendData(`${course}.json`, res);
})
app.get('/facilities', (req, res) => {
       sendData('facilities.json', res);
})
app.get('/students', (req, res) => {
       sendData('students.json', res);
})
app.post('/students', (req, res) => {
    const filePath = path.join(__dirname, '..', 'data', 'students.json');
    const newData = req.body;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        let value = [];
        if (!err && data) {
            try {
                value = JSON.parse(data);
            } catch (e) {
                value = [];
            }
        }
        value.push(newData);

        fs.writeFile(filePath, JSON.stringify(value, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }

            res.status(201).send(JSON.stringify({
                message: 'Contact stored successfully'
            }))
        }
        );
    });
});
app.listen(3270, () => {
    console.log("server running");

})

