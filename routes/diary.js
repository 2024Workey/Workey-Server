const express = require('express');
const { Diary } = require('../models');// index는 파일 이름 생략 가능 

const router = express.Router();

router.post('/:user_id/:ques_id', async (req, res) => {
  try {
    const diary = await Diary.create({
      userId : 1,
      quesId : req.params.ques_id,
      ...req.body
    });
    //console.log(diary);
    return res.status(201).json( {"message" : "셀프 체크 테스트 결과 저장에 성공했습니다."} )
  } catch(err) {
    console.error(err)
    return res.status(500).json( { "message": "글 작성에 실패하였습니다." } );
  }
})

module.exports = router;