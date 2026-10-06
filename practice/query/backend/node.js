const http = require('http');
const fs =require('fs');
const path=require('path');
const port=3270;
const datafile= path.join(__dirname,'data.json');
const product = JSON.parse(fs.readFileSync(datafile,'utf-8'));
// const frontend=path.join(_dirname,'..','frontend');


const server=http.createServer((req,res)=>{
     res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
   const url=new URL(req.url,`http://${req.headers.host}`);
   console.log("url      \n",url);
   console.log(req.headers.host);
   console.log(req.url);
   if(url.pathname==='/search'){
    let result=[...product];
    const input= url.searchParams.get('input');
    const dropdown = url.searchParams.get('dropdown');
    console.log(input,dropdown);
    if(input){
        result=result.filter(item=>item.name===input);
    }
    if(dropdown){
        result=result.filter(item=>item.category===dropdown);
    }
  res.statusCode = 201;
     res.setHeader('Content-Type', 'application/json');;
    res.end(JSON.stringify(result));

   }
})
server.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
})