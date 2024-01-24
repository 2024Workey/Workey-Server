const express = require('express');
const { User } = require('../models');// index는 파일 이름 생략 가능 
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const { now } = require('moment');

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

// 마이페이지 불러오기 
router.get('/mypage/:user_id', async (req, res) => {
    const id = req.params.user_id;
    try {
        const mypage = await User.findOne({
            attributes: ['id', 'lastName', 'firstName', 'startTime', 'endTime', 'company', 'payday'],
            where: { id: id },
        });
        // mypage 정보를 가져왔다면 
        if (mypage)
            return res.status(200).json({
                ...mypage,
                "userId": id
            });
        else
            return res.status(404).json({
                "error": "유저 정보를 찾을 수 없음",
                "userId": id
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error })
    }
})

// 마이페이지 수정
router.patch("/mypage/:user_id", async (req, res) => {
    const id = req.params.user_id;

    const { startTime, endTime, company, payday } = req.body;
    try {
        const todayYear = new Date().getFullYear();
        const todayMonth = new Date().getMonth()+ 1; // 월은 0부터 시작하므로 1을 더합니다.
        const formattedMonth = todayMonth < 10 ? '0' + todayMonth : todayMonth.toString();

        // 마이페이지 수정 
        const mypage = await User.update({
            startTime: startTime,
            endTime: endTime,
            company: company,
            payday: `${todayYear}-${formattedMonth}-${payday}`,
            updatedAt: now,
        }, {
            where: { id: id },
        });
        // 수정된 정보 가져오기
        const updatedUser = await User.findOne({
            where: { id: id },
        })
        if (mypage) {
            return res.status(200).json({
                "success": updatedUser,
                "userId": id
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error })
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
        })

        if (user) {
            return res.status(200).json({
                "message": "존재하는 유저 정보입니다.",
                "user_id": user.id
            })
        } else {
            return res.status(404).json({ "message": "존재하지 않는 유저 정보입니다." })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ "message": "존재하지 않는 유저 정보입니다." })
    }
})

// 새비밀번호 설정
router.patch('/recreating-pw/:user_id', async (req, res) => {
    const { password } = req.body
    const id = req.params.user_id

    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const user = await User.update({
            password: hashedPassword,
            updatedAt: now,
        }, {
            where: { id: id }
        })

        if (user) {
            return res.status(201).json({ "message": "새 비밀번호 생성에 성공하였습니다." })
        } else {
            return res.status(400).json({ "message": "새 비밀번호 생성에 실패하였습니다." })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ "message": "새 비밀번호 생성에 실패하였습니다." })
    }
})

module.exports = router; 