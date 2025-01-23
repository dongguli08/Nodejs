const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();
const secretText = 'superScret'
const refreshSecretText = 'supersuperSecret'

const posts=[
    {
        username: 'Jhon',
        title: 'Post 1'
    },
    {
        username: 'Han',
        title: 'Post 2'
    }
];
let refreshTokens = [];  // 데이터 베이스 대신 배열을 사용하여 refereshToken 저장

app.use(express.json()); //이 미들웨어가 바디를 분석해줌  JSON 데이터를 쉽게 읽을 수 있게 파싱해서 req.body로 접근할 수 있게 만들어준다.
app.use(cookieParser()); 
app.post('/login',(req,res)=>{
    const username = req.body.username; //express.json이 존재해서 req.body로 접근할수 있도록 한다, 반드시 json데이터에 username이라는 키를 포함해야함
    const user = {name:username};  //username에 저장한 값을 user 객체의 name 속성으로 넣어주는 코드



    //jwt를 이용해서 토큰 생성하기 payload+secretText
    //유효기간 추가
    const accessToken = jwt.sign(user, //user부분은 payload
        secretText,
        {expiresIn:'30s'});
    
    //jwt를 이용해서 refreshToken도 생성
    const refreshToken = jwt.sign(user,
        refreshSecretText,
        {expiresIn:'1d'}) //토큰의 유효기간을 설정
        
    refreshTokens.push(refreshToken)

        //refreshToken을 쿠키에 넣어주기
        res.cookie('jwt',refreshToken,{ //res.cookie(name, value, options) 쿠키이름, 쿠키에 저장할 값(refreshToken)
            httpOnly:true, //쿠키가 js에서 접근하지 못하도록 설정
            maxAge:24 * 60 * 60 *1000 //쿠키의 유효 기간
        })    

    res.json({ accessToken:accessToken }) //로그인을 하면 accessToken을 전송
})
app.get('/posts',authMiddleware,(req, res) => { //authMiddleware함수를 통해서 토큰이 유효한지 판단하고 정보를 전송
    res.json(posts)  // 이 api는 토큰이 유효한지 판단을 함
})

function authMiddleware(req,res,next){ 
    //토큰을 request headers에서 가져오기
    const authHeader = req.headers['authorization'];  //authorization 헤더는 HTTP 요청에 인증 정보를 포함하는 데 사용되는 헤더야.
    //Bearer a;ldkfja;ldkfj.sldkfjsldkfj.sdjlkjsdlfkj
    const token = authHeader && authHeader.split(' ')[1] //bearer 토큰에서 jwt를 추출하기 위함
    if(token == null) return res.sendStatus(401);

    //토큰이 있으니 유효한 토큰인지 확인
    jwt.verify(token, secretText, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
} 

app.get('/refresh',(req,res)=>{ //refreshToken으로 accessToken새로 생성하기
    
    // body => parsing => req.body
    // cookies => parsing => req.body

    //cookies 가져오기 cookie-parser
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(403)
    
    const refreshToken = cookies.jwt;
    //refreshtoken이 데이터베이스에 있는 토큰인지 확인
    if(!refreshToken.includes(refreshToken)){ //이 코드에서는 db가 존재하지 않음
        return res.sendStatus(403)
    }

    //token이 유효한 토큰인지 확인
    jwt.verify(refreshToken,refreshSecretText,(err,user)=>{   //verify() 메서드는 **JSON Web Token (JWT)**을 검증하는 역할을 해. (token,secret,callback)
        if(err) return res.sendStatus(403)
        //accessToken을 생성하기
        const accessToken = jwt.sign({name:user.name},  //jwt.sign으로 jwt생성 그리고 name:user.name은 user객체에서 name을 가져옴 (25줄)
            secretText,
            {expiresIn:'30s'}
        )
        res.json({accessToken})
    })

})

const port = 4000;
app.listen(port,()=>{
    console.log('listening on port'+port)
})