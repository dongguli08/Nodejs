//웹서버 생성하기와, http 라우팅
const http = require('http')
const { url } = require('inspector')
const targetObject = {a:"a",b:"b"}

const server  = http.createServer((req,res) => {
    if(req.method==='POST'&&req.url==='/home'){
        req.on('data',(data) =>{
            console.log(data)
            const stringfiedData = data.toString()
            console.log(stringfiedData)
            Object.assign(targetObject,JSON.parse(stringfiedData))
        })
    }else{
        if(req.url ==='/home'){
            res.writeHead(200,{
                "content-type":"application/json"
            });
            res.end(JSON.stringify({targetObject}))
        }else if(req.url==='/about'){
            res.setHeader('Content-Type','text/html')
            res.write('<html>');
            res.write('<body>');
            res.write('<h1>About page</h1>');
            res.write('</body>');
            res.write('<html>');
        }else{
            res.statusCode = 404;
            res.end()
        }
    }
})

server.listen(4000,()=>{
    console.log('listening on port 4000')
})