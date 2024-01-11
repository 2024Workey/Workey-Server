const express = require('express');
const { User } = require('../models');// index는 파일 이름 생략 가능 

const router = express.Router();

// endpoint
// 시퀄라이즈가 제공하는 건 모두 비동기함수
router.post('/join', async (req, res) => {
    try {
        console.log('req', req)
        console.log('req', req.body)
        const user = await User.create(req.body);
        // console.log('user', user);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Error creating user" });
    }
});

router.get('/', async ( req, res ) => {
    try {
        const user = await User.findAll();
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({"message": "fail"})
    }
})

module.exports = router; 