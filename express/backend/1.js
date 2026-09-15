const path = require('path');
// const http =require('http');
const fs = require('fs');
// const port=3270;
const datafile = path.join(__dirname, 'datafile.json');
const express = require('express');
const app = express();
app.use(express.json());
// app.get('/home',(req,res)=>{
//     // res.send('homepage');
//     res.send('<h1>hello</h1>');
// })

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'style.css')
  , (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }
        });
})

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
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'about.html')
        , (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }
        });
})
app.get('/placement', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'placement.html')
        , (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }
        });
})
app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'courses.html')
        , (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }
        });
})
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'contact.html')
, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }
        });
})
app.get('/courses/bca', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'bca.html')
    , (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('File not found');
            return;
        }
    })
});

app.get('/courses/btech', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'btech.html')
        , (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }
        });
})
app.get('/facilities', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'facilities.html')
        , (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }
        });
})
app.get('/students', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'students.html')
        , (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('File not found');
                return;
            }
        });
})
app.post('/students', (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    const newData = req.body;

    fs.readFile(datafile, 'utf-8', (err, data) => {
        let value = [];
        if (!err && data) {
            try {
                value = JSON.parse(data);
            } catch (e) {
                value = [];
            }
        }
        value.push(newData);})
    
    fs.writeFile(datafile, JSON.stringify(value, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('File not found');
            return;
        }
    })
    res.status(201).send(JSON.stringify({
        message: 'Contact stored successfully'
    }))
})
app.listen(3270, () => {
    console.log("server running");

})

