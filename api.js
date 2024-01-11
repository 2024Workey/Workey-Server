const express = require('express')
const bodyParser = require("body-parser")
const mysql = require('mysql2')
const cors = require('cors')
const session = require('express-session')
const bcrypt = require('bcrypt');//1
const SALT_ROUNDS = 10// 2의 10승 반복

const app = express()
app.use(cors())
app.use(bodyParser.json())// body로 보낸 데이터를 json으로 해석해서 컴퓨터가 이해하게 된다

const port = 3000
const pool = mysql.createPool({// connection을 여러 개 만들어 쓸 수 있다.(기본10개)
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'workey_db'
})

const sec = 1000
const hour = 60 * 60 * sec
// session 관련 설정 (=만료시간)
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // maxAge: 10 * sec
        maxAge: hour
    }
}))

// 미들웨어: 중간에 껴서 잠깐 검사를 한다.
const loginRequired = function(req, res, next) {
    if(req.session.user) {
        next()
    } else {
        // 원래는 401(인증안됨)을 해야 함
        // 근데 그냥 귀찮아서 440으로 함
	    // 440 => 마소가 쓰는 세션 만료용 에러 코드
        res.status(440).json({ result: "현재 로그인 상태가 아닙니다." })
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})