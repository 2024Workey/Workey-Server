const express = require('express');
const { User } = require('../models');// index는 파일 이름 생략 가능 
const { Op } = require("sequelize");

const router = express.Router();

// endpoint
// 시퀄라이즈가 제공하는 건 모두 비동기함수
router.post('/join', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({"message" : req.body.email+" join success"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error creating user" });
    }
});

// 로그인
router.get('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const exEmail = await User.findOne({ // 이메일 검사
            where: { // where : DB에서 조건을 건다.
                email: email,
            }
        });
        const exPassword = await User.findOne({ // 이메일 검사
            where: {
                password: password,
            }
        });
        
        // 
        if (exEmail && exPassword) {
            return res.status(200).json({"message": "login success"});
        }
        console.log('User: ' + user);
        
    } catch (error) {
        res.status(500).json({ "error": error })
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