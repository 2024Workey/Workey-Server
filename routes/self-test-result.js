const express = require('express');
const { SelfTestResults } = require('../models');// index는 파일 이름 생략 가능 

const router = express.Router();

router.post('/:diary_id', async (req, res) => {
  try {
    const selfTestResult = await SelfTestResults.create({
      diaryId : req.params.diary_id,
      ...req.body
    });
    return res.status(201).json({
      "diaryId" : req.params.diary_id,
      "message" : "셀프 체크 테스트 결과 저장에 성공했습니다."
    })
  } catch(err) {
    console.error(err)
    return res.status(500).json( { "message" : "셀프 체크 테스트 결과 저장에 실패했습니다." } )
  }
})

module.exports = router;