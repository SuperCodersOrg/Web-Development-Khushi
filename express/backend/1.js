const path = require('path');
console.log('running by express');
// const http =require('http');
const fs = require('fs');
// const port=3270;
const datafile = path.join(__dirname, 'datafile.json');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
// app.get('/home',(req,res)=>{
//     // res.send('homepage');
//     res.send('<h1>hello</h1>');
// })
function sendData(fileName, res) {   const filePath = path.join(__dirname, '..', 'data', fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(
                 'File not found'
            );
        }

        res.json(JSON.parse(data));
    });
}
// app.get('/style.css', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'frontend', 'style.css')
//   , (err) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send('File not found');
//                 return;
//             }
//         });
// })

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
    //  sendData('home.json', res);
})
app.get('/home', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')
    //     , (err) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('File not found');
    //             return;
    //         }
    //     }

    // )
      sendData('home.json', res);
})
app.get('/about', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'frontend', 'about.html')
    //     , (err) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('File not found');
    //             return;
    //         }
    //     });
      sendData('about.json', res);
})
app.get('/placement', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'frontend', 'placement.html')
    //     , (err) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('File not found');
    //             return;
    //         }
    //     });
    sendData('placement.json', res);
})
app.get('/courses', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'frontend', 'courses.html')
    //     , (err) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('File not found');
    //             return;
    //         }
    //     });
      sendData('courses.json', res);
})
app.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'frontend', 'contact.html')
// , (err) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send('File not found');
//                 return;
//             }
//         });
 sendData('contact.json', res);
})
app.get('/courses/bca', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'frontend', 'bca.html')
    // , (err) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('File not found');
    //         return;
    //     }
    // })
       sendData('bca.json', res);
});

app.get('/courses/btech', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'frontend', 'btech.html')
    //     , (err) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('File not found');
    //             return;
    //         }
    //     });
     sendData('btech.json', res);
})
app.get('/facilities', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'frontend', 'facilities.html')
    //     , (err) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('File not found');
    //             return;
    //         }
    //     });
    sendData('facilities.json', res);
})
app.get('/students', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'frontend', 'students.html')
    //     , (err) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('File not found');
    //             return;
    //         }
    //     });
    sendData('students.json', res);
})
app.post('/students', (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    const filePath=path.join(__dirname,'..','data','students.json');
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

