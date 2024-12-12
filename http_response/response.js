const express = require('express'); // Express 모듈 가져오기
const app = express(); // Express 애플리케이션 생성

// app.get('/',(req,res)=>{
//     res.statusCode(200)//ok
// })
app.get('/', (req, res) => {
    // res.sendStatus(200); ok
    // res.sendStatus(400) //bad request
    // res.sendStatus(403) //forbidden
    // res.sendStatus(404) //not found
    // res.sendStatus(500) //internal server error
    res.sendStatus(503) //service unavailable
  });

app.listen(4000,()=>{
    console.log('start listening on 4000')
})
//  파일은 cd 명령어로 접근할 수 없다. cd는 디렉토리(폴더)에 들어가는 명령어라서 파일 경로를 입력하면 오류가 발생한다.