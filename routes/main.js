const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/:user_id', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id : req.params.user_id
      }
    })

    if(user) {
      return res.status(200).json({
        "startTime": user.startTime,
        "endTime": user.endTime,
        "payday": user.payday
      })
    } else {
      res.status(404).json( { "message": "해당 유저 정보가 없습니다." } )
    }
    
  } catch(err) {
      console.error(err);
      return res.status(500).json( { "message": "메인 화면 데이터 조회에 실패했습니다." } )
  }
})

module.exports = router;