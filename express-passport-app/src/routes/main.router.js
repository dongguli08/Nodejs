const express = require('express');
const mainRouter = express.Router();
const{checkAuthenticated} = require('../middleware/auth');
const{checkNotAuthenticated} = require('../middleware/auth');

mainRouter.get('/',checkAuthenticated,(req,res)=>{//사용자가 4000번으로 들어오면 이 코드가 실행
    res.render('index') // 인증이 되어있으면 next로 보내서 index화면으로 전환
})

mainRouter.get('/login',checkNotAuthenticated,(req,res)=>{   
    res.render('login'); //next 다음으로 실행
});


mainRouter.get('/signup',checkNotAuthenticated,(req,res)=>{
    res.render('signup');
})

module.exports = mainRouter;