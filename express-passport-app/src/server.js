const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const config = require('config');
const serverConfig = config.get('server');
const mainRouter = require('./routes/main.router');
const usersRouter = require('./routes/users.router'); //usersRouter를 모듈된것을 불러오는 코드
const productsRouter = require('./routes/products.router');
const app = express();

require('dotenv').config();

const port = serverConfig.port;

// Cookie session 설정
app.use(cookieSession({
    keys: [process.env.COOKIE_ENCRYPTION_KEY]
}));

// 세션을 재생성하고 저장하는 미들웨어 (passport와 관련)
app.use(function (req, res, next) {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb();
        };
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb();
        };
    }
    next();
});

// passport 초기화 및 세션 설정
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

// 요청 본문 파싱 설정
app.use(express.json()); // JSON 형식의 요청 본문을 처리하기 위해 사용하는 미들웨어
app.use(express.urlencoded({ extended: false })); // HTML form 데이터 처리

// 사용자 라우터
app.use('/', usersRouter); // /login은 /로 시작하므로 app.use('/', usersRouter)를 반드시 거침

// 메인 라우터
app.use('/', mainRouter); // /login은 /로 시작하므로 app.use('/', mainRouter)를 반드시 거침

app.use('/products',productsRouter)

// EJS 템플릿 설정
app.set('views', path.join(__dirname, 'views')); // 경로
app.set('view engine', 'ejs');

// MongoDB 연결
mongoose.set('strictQuery', false);
mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log(err);
    });

// 정적 파일 제공
app.use('/static', express.static(path.join(__dirname, 'public')));



// 서버 실행
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
