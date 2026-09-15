const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000

function find(searchQuery,callback){
    const filePath=path.join(__dirname,'frontend','data.json');
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            return callback(err,null);
        }
        const users=JSON.parse(data);
        const filtered =users.filter(user=>{
           return  user.name.toLowerCase().includes(searchQuery.toLowerCase());

        }
    )
    callback(null,filtered);
    })
};
const server =http.createServer((req,res)=>{
    const parsedUrl =new URL(req.url,`http://${req.headers.host}`);
    // console.log("host    ",req.headers.host);
    //  console.log(req.url);
    // console.log(parsedUrl);
   
    const pathname =parsedUrl.pathname;
    if(pathname==='/search'&& req.method==='GET'){
        const searchQuery = parsedUrl.searchParams.get('q') || '';
        
    //    find(searchQuery, (err, results) => {
    //         if (err) {
    //             res.writeHead(500, { 'Content-Type': 'application/json' });
    //             res.end(JSON.stringify( {'error':' Database read failed' }));
    //             return;
    //         }

    //         res.writeHead(200, { 'Content-Type': 'application/json' });
    //         res.end(JSON.stringify({
    //             query: searchQuery,
    //             results: results
    //         }));})}
}
            else if (pathname === '/' || pathname === '/index.html') {
        fs.readFile(path.join(__dirname,'frontend', 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error loading HTML');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    }
else if (pathname === '/script.js') {
        fs.readFile(path.join(__dirname,'frontend', 'script.js'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error loading JS');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(content);
        });
    }
  
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Pure Node.js server running at http://localhost:${PORT}`);
});