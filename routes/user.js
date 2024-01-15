const express = require('express');
const { User } = require('../models');// index는 파일 이름 생략 가능 
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

const salt = 12;// 값이 높을수록 암호화 연산 증가 

// endpoint
// 시퀄라이즈가 제공하는 건 모두 비동기함수
router.post('/join', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({ "message": req.body.email + " join success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error creating user" });
    }
});

// 로그인
router.get('/login', async (req, res, passport) => {
    const { email, password } = req.body;
    bcrypt.hash(PW, salt, (err, encryptedPW) => {

    })

    // hashSync 동기
    const hash = bcrypt.hashSync(PW, salt);

    // async/await 사용
    // const hash = await bcrypt.hash(PW, salt)

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
    if (user) {
        return res.status(200).json({ "message": "login success" });
    }
});

// 모든 유저 불러오기 
router.get('/', async (req, res) => {
    try {
        const user = await User.findAll();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

module.exports = router; 