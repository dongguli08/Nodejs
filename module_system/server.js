//http 서버 구축하기
const http = require('http');

const port = 3000;

const server = http.createServer((req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    res.end('<h1>hello world</h1>')
})
server.listen(port,()=>{
    console.log(`server running at port ${port}`);

})