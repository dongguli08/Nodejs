function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // 인증된 경우, 다음 작업으로 진행
    }
    res.redirect('/login'); // 인증되지 않은 경우, 로그인 페이지로 이동
}


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/'); // 인증된 경우, 홈으로 리다이렉트
    }
    next(); // 인증되지 않은 경우, 다음 작업으로 진행
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
}

//미들웨어 

