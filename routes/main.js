const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/:user_id', async (req, res) => {
  try {
    // TODO : 왜 users로 객체가 만들어지는지 user가 아니라
    const users = await User.findOne({
      where: {
        id : req.params.user_id
      }
    })
    // console.log(users.dataValues);
    // console.log(users);
    return res.status(200).json({
      "startTime": users.startTime,
      "endTime": users.endTime,
      "payday": users.payday
    })
  } catch(err) {
      console.error(err);
      return res.status(500).json( { "message": "메인 화면 데이터 조회에 실패했습니다." } )
  }
})

module.exports = router;