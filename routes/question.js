const express = require('express');
const { Question } = require('../models');// index는 파일 이름 생략 가능 
const moment = require("moment");
moment().format("DD");

const router = express.Router();

router.get("/", async (req, res) => {
    // const todayDate = now;
    const date = moment().format("DD");
    try {
        const question = await Question.findOne({
            attributes: ['id', 'question'],
            where: { id: date },
        })
        if ( question ) {
            return res.status(200).json({
                "success": question
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

module.exports = router;