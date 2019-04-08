const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    fs.readFile('./server2.html',(err,data)=>{
        if(err){
            throw err;
        }
        res.end(data);
    })
}).listen(8080,()=>{
    console.log('8080 포트 대기중');
})