const http = require("http");
const os = require('os');
const path = require('path');
const process = require('process');
const fs = require('fs');
const url = require('url')
const crypto = require('crypto');

process.env.PORT = 3000
const PORT  =  process.env.PORT
const welcome = fs.readFileSync(path.join(__dirname,`./public/home.html`),'utf-8');
const contact = fs.readFileSync(path.join(__dirname,`./public/contact.html`),'utf-8');

const app = http.createServer((req,res)=>{
    
    if( req.url === "/"){
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(welcome)
    }
    else if (req.url === "/platform"){
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(`this system use <strong>"${os.platform()}"</strong> platform`);
    }
    else if(req.url === "/contact"){
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(contact)
    }
    else if(req.url.includes('/crypto')){
        const queryObject = url.parse(req.url, true).query;
        const secter = "this is secret";
        const hashedString = crypto.createHmac('sha256',secter)
                            .update(queryObject.string)
                            .digest('hex');
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(`this is hashed String which you entered in query <h3>${hashedString}</h3>`);
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html'});
        res.write("<h1>Oops.....look like you are looiking for something which is not exist.</h1>")
    }
    res.end()
})

app.listen(PORT,()=>{
    console.log(`app is listening at port ${PORT}`);
})