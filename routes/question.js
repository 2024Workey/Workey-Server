const express = require('express');
const { Question } = require('../models');// index는 파일 이름 생략 가능 
const moment = require("moment");
moment().format("DD");

const router = express.Router();

router.get("/", async (req, res) => {
    // const todayDate = now;
    // const questionId = req.params.questionId;
    const date = moment().format("DD");
    try {
        const question = await Question.findOne({
            where: { id: date },
        })
        console.log(question);
        if ( question ) {
            return res.status(200).json({
                "data": question
            });
        } else {
            return res.status(404).json({
                "error today": date
            });
        }
        console.log(question);
        // console.log(question.question);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": error
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const {  } = req.body;

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

router.get('/:quesId', async (req, res) => {
    try {
      const question = await Question.findOne({
        where: {
          id : req.params.quesId 
        }
      })
      return res.status(200).json( question.dataValues.question )
    } catch(err) {
      console.error(err)
      return res.status(500).json( { "message": "글 단독 불러오기에 실패하였습니다." } );
    }
  })

module.exports = router;