const express = require('express');
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');
const sequelize = require("./config/config");

const path = require('path');
const bodyParse = require('body-parser')
const passport = require('passport');

const app = express();
const port = 3003;

// 세션
const SEC = 1000;
const HOUR = 60 * 60 * SEC;

// routes
const mainRouter = require('./routes/main')
const userRouter = require('./routes/user')
const questionRouter = require('./routes/question')
const companyRouter = require('./routes/company')
const diaryRouter = require('./routes/diary')
const selfTestResultRouter = require('./routes/self-test-result')

app.get('/', (req, res) => {
  return res.send("Workey!");
})

sequelize.sync()
  .then(() => {
    console.log('Database synced')
  })
  .catch((err) => {
    console.error('Error syncing database:', err)
  });

// 미들웨어, session
// CORS 설정
const corsOptions = {
  origin: '*', // 허용할 출처를 명시합니다.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // 허용할 메서드를 명시합니다.
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더를 명시합니다.
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize()); //초기화
app.use(passport.session()); //세션에서 로그인정보 복구

// router - 진입할 엔드포인트 + 진입할 라우터
app.use('/main', mainRouter)
app.use('/users', userRouter)
app.use('/questions', questionRouter)
app.use('/companies', companyRouter)
app.use('/diaries', diaryRouter)
app.use('/self-test-results', selfTestResultRouter)

app.listen(port, () => {
  console.log(port, '번 포트에서 대기 중');
});