const express = require('express');
const { Company, User } = require('../models');// index는 파일 이름 생략 가능 

const router = express.Router();

// 자기 회사 입력하기
router.post('/', async (req,res) => {
  try {
    const company = await Company.create(req.body);
    return res.status(201).json({ "id" : company.dataValues.id, "message": "회사 추가에 성공하였습니다." })
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      "message": "회사 추가에 실패하였습니다."
    })
  }
})

// 회사 list (ranking)
router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll({
      order: [
        ['total_good_state_count', 'DESC']
      ]
    });
    return res.status(200).json(companies);
  } catch(err) {
    return res.status(501).json({ "message": "회사 불러오기에 실패하였습니다." });
  }
})

// 회사 하나 반환 (ranking)
router.get('/:company_id', async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        id : req.params.company_id
      }
    });
    
    return res.status(201).json(company)
  } catch(err) {
    console.error(err);
    return res.status(500).json( { "message" : "회사 조회에 실패하였습니다." })
  }
})

// 회사 이름으로 하나 반환
router.get('/name/:company_name', async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        name : req.params.company_name
      }
    });
    
    return res.status(201).json(company)
  } catch(err) {
    console.error(err);
    return res.status(500).json( { "message" : "회사 조회에 실패하였습니다." })
  }
})

router.patch('/:company_id', async (req, res) => {
  const company_id = req.params.company_id
  try {
    const company = await Company.findOne({
      where : {
        id : company_id
      }
    })

    const updateCount = company.total_good_state_count + 1

    await Company.update({
      total_good_state_count : updateCount
    },{
      where : {
        id : company_id
      }
    })

    const updatedCompany = await Company.findOne({
      where : {
        id : company_id
      }
    })

    return res.status(200).json(updatedCompany)
  } catch (error) {
    return res.status(500).json( { "message" : "회사별 긍정적 워라밸 지표 수정에 실패하였습니다." })
  }
})


module.exports = router;