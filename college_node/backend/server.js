const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 3270;
const datafile = path.join(__dirname, 'datafile.json');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/students') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            let formData;
            try {
                formData = JSON.parse(body);
            }
            catch (err) {
                res.statusCode = 500;
                res.end('ERROR READING DATA');
                return;
            }

            fs.readFile(datafile, 'utf-8', (err, data) => {
                let value = [];
                if (!err && formData) {
                    try { value = JSON.parse(data); }
                    catch {
                        res.statusCode = 500
                        res.end('invalid json ');
                        return;
                    }

                }
                value.push(formData);
                fs.writeFile(
                    datafile,
                    JSON.stringify(value, null, 2)
                    ,
                    (err) => {
                        if (err) {
                            res.statusCode = 500;
                            res.end('ERROR READING THIS FILE');
                            return;
                        }
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({
                            message: 'Contact stored successfully'
                        }));
                    }

                );
            });
        });
        return;
    }

    if (req.method === 'GET') {
        let filePath = '';


        if (req.url === '/home') {
            filePath = 'home.json';
        } else if (req.url === '/about') {
            filePath = 'about.json';
        } else if (req.url === '/contact') {
            filePath = 'contact.json';
        } else if (req.url === '/courses') {
            filePath = 'courses.json';

        } else if (req.url.startsWith('/courses/')) {
            console.log(req.url);
            let course = req.url.split('/')[2];
            filePath = `${course}.json`;
        }
        else if (req.url === '/facilities') {
            filePath = 'facilities.json';
        } else if (req.url === '/placement') {
            filePath = 'placement.json';
        } else if (req.url === '/students') {
            filePath = 'students.json';
        } else {
            res.statusCode = 404;
            res.end('PAGE NOT FOUND');
            return;
        }

        let fullPath = path.join(__dirname, '..', 'data', filePath);
        if (!fs.existsSync(fullPath)) {
            res.statusCode = 404;
            res.end('PAGE NOT FOUND');
            return;
        }

        fs.readFile(fullPath, 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('INTERNAL SERVER ERROR');
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(data);
        });

        return;
    }
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end('ROUTE NOT FOUND');
})

server.listen(3270, () => {
    console.log(`Server Running at http://localhost:${port}`);
})