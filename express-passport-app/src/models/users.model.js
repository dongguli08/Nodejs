const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 5,
        required: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
});


const saltRounds = 10;

userSchema.pre('save', function(next) { //저장하기 전에 실행함
    let user = this;

    // 비밀번호가 항상 수정된 것처럼 처리하여 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // 해시된 비밀번호를 user.password에 저장
            user.password = hash;
            next(); // 비밀번호 해시화가 끝났으면 next() 호출
        });
    });
});//이거는 사용하는 객체가 아니고 orm에서 처리하는 코드이다





userSchema.methods.comparePassword = function (plainPassword) {
    return new Promise((resolve, reject) => {
        console.log("Plain password:", plainPassword); // 평문 비밀번호 로그
        console.log("Hashed password in DB:", this.password); // DB에서 가져온 해시 비밀번호 로그

        bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
            if (err) {
                console.log("Error during password comparison:", err);
                return reject(err); // 에러 발생 시 reject
            }
            resolve(isMatch); // 비교 결과 반환
        });
    });
};//이거는 불러와서 사용




const User = mongoose.model('User', userSchema);
module.exports = User;

//모델은 db