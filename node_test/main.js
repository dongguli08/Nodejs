const express = require('express')
const app = express()
 
// HTML 파일에서 JavaScript 파일을 요청할 때 정적 파일 경로가 설정되어 있어야 서버가 해당 파일을 찾아 브라우저에 반환할 수 있기 때문이야.
app.use('/scripts',express.static(__dirname+'/scripts'))

 app.listen(3000,()=> {
    console.log('서버에 요청을 보냈습니다')
 })
//처리해주는 루틴들을 추가
app.get('/',(req,res)=>{
     console.log('루트에 대한 요청 들어왓음 ')
    //  res.send('루트에 대한 요청')
    res.sendFile(__dirname+'/pages/index.html')
})

app.get('/about',(req,res)=>{
     console.log('about에 대한 요청 들어왔음')
    //  res.send('about에 대한 요청')
    res.sendFile(__dirname+'/pages/about.html')
})  

app.get('/working',(req,res)=>{
    console.log('woring 에 대한 요청 들어왔음')
   //  res.send('about에 대한 요청')
   res.sendFile(__dirname+'/pages/working.html')
})  