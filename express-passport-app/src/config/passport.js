const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);// 세션에 user.id를 저장
});

passport.deserializeUser((id, done) => {
    User.findById(id)// 세션에 저장된 ID로 사용자 조회
        .then(user => {// 조회된 사용자 정보를 req.user에 할당
            done(null, user);
        })
        .catch(err => done(err));// 에러가 나면 처리
});

passport.use( //DB와 이메일 password비교 , 로그인
    'local',
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email.toLowerCase() }); //User.findOne이 db와 조회가능

                console.log(user); // 유저가 잘 조회되는지 확인하기
                
                if (!user) {
                    return done(null, false, { msg: 'Invalid email or password' });
                }

                const isMatch = await user.comparePassword(password); // 비밀번호 비교
                console.log('Password match:', isMatch); // 비밀번호 비교 결과 출력

                if (isMatch) {
                    return done(null, user); // 비밀번호가 일치하면 로그인 성공
                } else {
                    return done(null, false, { msg: 'Invalid email or password' }); // 불일치 시 실패
                }
            } catch (err) {
                return done(err); // 에러 발생 시 처리
            }
        }
    )
);





//로그인을 하면 db에 있는 정보와 비교를하고 맞으면 통과
//session의 역할은 로그인후에 유지를해주는 역할

//세션은 번호표
//jwt는 기한을 정해주고 사용자 식별 정보를 포함

//passport는 로그인관여는 read