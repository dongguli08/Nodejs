const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;
const SECRET_KEY = "your_secret_key"; // JWT 서명에 사용할 비밀키
let users = {}; // 사용자 데이터를 메모리에 저장 (데이터베이스 대신)

app.use(bodyParser.json());

// 회원가입
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // 사용자 중복 체크
    if (users[username]) {
        return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
    }

    // 비밀번호 해싱 후 저장
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };

    return res.status(201).json({ message: "회원가입 성공!" });
});

// 로그인
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // 사용자 확인
    const user = users[username];
    if (!user) {
        return res.status(400).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "비밀번호가 올바르지 않습니다." });
    }

    // JWT 발급
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: "로그인 성공!", token });
});

// 인증된 사용자 정보 조회
app.get('/profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Authorization 헤더에서 토큰 추출

    if (!token) {
        return res.status(401).json({ message: "토큰이 필요합니다." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // 토큰 검증
        return res.status(200).json({ message: "사용자 인증 성공!", username: decoded.username });
    } catch (err) {
        return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//jwt코드