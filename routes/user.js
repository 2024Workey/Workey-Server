const express = require('express');
const { User } = require('../models');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const { now } = require('moment');

const router = express.Router();

const salt = 10; // 값이 높을수록 암호화 연산 증가

// 회원가입
router.post('/join', async (req, res) => {
    try {
        const { password } = req.body;

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        console.log("유저탄생 " + newUser);

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
        console.log('user', user);
        console.log('body', req.body);
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return res.status(200).json(user);
            } else {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            return res.status(404).json({ error: 'User not found' });
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
        return res.status(500).json({ "error": error });
    }
})

// 마이페이지 불러오기
router.get('/mypage/:user_id', async (req, res) => {
    const id = req.params.user_id;
    try {
        const mypage = await User.findOne({
            attributes: ['id', 'lastName', 'firstName', 'startTime', 'endTime', 'company', 'payday'],
            where: { id: id },
        });
        if (mypage)
            return res.status(200).json({
                ...mypage.dataValues,
                "userId": id
            });
        else
            return res.status(404).json({
                "error": "유저 정보를 찾을 수 없음",
                "userId": id
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error });
    }
})

// 마이페이지 수정
router.put("/mypage/:user_id", async (req, res) => {
    const id = req.params.user_id;

    const { firstName, lastName, startTime, endTime, company, payday } = req.body;
    try {
        const todayYear = new Date().getFullYear();
        const todayMonth = new Date().getMonth() + 1;
        const formattedMonth = todayMonth < 10 ? '0' + todayMonth : todayMonth.toString();

        const [updated] = await User.update({
            firstName,
            lastName,
            startTime,
            endTime,
            company,
            payday,
            updatedAt: new Date(),
        }, {
            where: { id: id },
        });

        if (updated) {
            const updatedUser = await User.findOne({ where: { id: id } });
            return res.status(200).json({
                "success": updatedUser,
                "userId": id
            });
        } else {
            return res.status(404).json({ "message": "User not found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error });
    }
})

// 비밀번호 비교
router.post('/recreating-pw', async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        const user = await User.findOne({
            where: {
                firstName: firstName,
                lastName: lastName,
                email: email
            }
        });

        if (user) {
            return res.status(200).json({
                "message": "존재하는 유저 정보입니다.",
                "user_id": user.id
            });
        } else {
            return res.status(404).json({ "message": "존재하지 않는 유저 정보입니다." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "존재하지 않는 유저 정보입니다." });
    }
})

// 새비밀번호 설정
router.put('/recreating-pw/:user_id', async (req, res) => {
    const { password } = req.body;
    const id = req.params.user_id;

    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const [updated] = await User.update({
            password: hashedPassword,
            updatedAt: now,
        }, {
            where: { id: id }
        });

        if (updated) {
            return res.status(200).json({ "message": "새 비밀번호 생성에 성공하였습니다." });
        } else {
            return res.status(400).json({ "message": "새 비밀번호 생성에 실패하였습니다." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "새 비밀번호 생성에 실패하였습니다." });
    }
})

module.exports = router;
