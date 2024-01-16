const express = require('express');
const { User } = require('../models');// index는 파일 이름 생략 가능 
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');

const router = express.Router();

const salt = 10;// 값이 높을수록 암호화 연산 증가 

// endpoint
// 시퀄라이즈가 제공하는 건 모두 비동기함수
router.post('/join', async (req, res) => {
    try {
        const { password } = req.body;

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        console.log("유저탄생 " + newUser);

        // req.session.save((err) => {
        //     if (err) {
        //         console.log("에러임 " + err)
        //     }
        // })

        // req.session.user = newUser;
        // console.log("세션확인 : "+req.session.user);

        return res.status(201).json({ "message": req.body.email + " join success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error creating user" });
    }
});

// 로그인
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        console.log('user', user)
        console.log('body', req.body)
        // user가 있으면
        if (user) {
            // 비밀번호 비교
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                console.log("배열인지 확인용 " + req.session);
                // req.session.save(function () {
                //     req.session.user = user;
                //     // return res.status(200).json(user);
                // })
                // // 로그인 성공 시 세션에 사용자 정보 저장
                // console.log("쿠키"+req.session.user);
                return res.status(200).json(user);
            } else {
                // user가 존재하지 않으면
                console.log("user 없음");
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error logging in' });
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