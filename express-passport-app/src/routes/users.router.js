const express = require('express');
const passport = require('passport');
const usersRouter = express.Router();
const User = require('../models/users.model')


usersRouter.post('/login',(req,res,next)=>{ //express에서 받은것
    console.log('Request body:', req.body);  // 여기서 요청 본문 확인
    passport.authenticate("local",(err,user,info)=>{ //passport에게 주는것
        if(err){
            return next(err); //정상적인 통신이 안될때 에러
        }

        if(!user){
            return res.json({msg:info}); //사용자가 없으면 에러 발생
        }

        req.logIn(user,function(err){ //passport가 user객체를 서버에있는 session서버에 넣어준다
            if(err){return next(err);} //세션 서버 문제
            res.redirect('/')  //정상적으로 로그인되면 메인페이지로
        })
    })(req,res,next); //미들웨어 때문에 존재
})


usersRouter.post('/logout',(req,res,next)=>{
    req.logOut(function(err){
        if(err){return next(err);}
        res.redirect('/login')
    })
})


//기다릴때 다른 signup요청이 오면 비동기로 처리할수 있음
usersRouter.post('/signup', async (req, res) => { //async은 함수가 비동기라는것을 선언,(async은 함수이름 앞에)
    const user = new User(req.body);
    
    // {
    //     email:'test@naver.com',
    //     password:'1234',
    //     _id:Object(sdkcasfdadf)
    // } 이게 this
    
    try {
        await user.save(); //db연결시간 등을 포함하여 기다리라는것을 명시 , 이게 create
        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.error('Error during signup:', err);
        return res.status(500).json({ //서버에러
            message: 'Internal Server Error',
            error: err.message || 'Unknown error occurred',
        });
    }
});

usersRouter.post('/delete', async (req, res) => {
    const email = req.body.email
    console.log(email)
    if (!email) {
        return res.status(400).json({ msg: 'User ID is required' }); // id가 없으면 에러 처리
    }

    try {
        const user1 = await User.findOneAndDelete({ email: email.toLowerCase() }); // 해당 ID로 사용자 삭제
        if (!user1) {
            return res.status(404).json({ msg: 'User not found' });
        }
        return res.json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

usersRouter.post('/update',async(req,res)=>{
    const old_email = req.body.old_email
    const new_email = req.body.new_email
    
    if(!old_email||!new_email){
        return res.status(400).json({msg:'user email is required'})
    }
    try{
        const user = await User.findOne({email: new_email.toLowerCase()});
        if(user){
            return res.json({msg:'this email is already have'})
        }
        const newUser = await User.findOneAndUpdate({email:old_email.toLowerCase()},{email:new_email.toLowerCase()},{new:true})
        if(!newUser){
            return res.json({msg:'no user found'})
        }
            return res.json({msg:'email changed'})
    } catch(e){
        console.error(e);
        return res.status(500).json({msg:'Server error'})
    }
})


module.exports = usersRouter;