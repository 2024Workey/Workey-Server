const express = require('express');
const path = require('path');
const morgan = require('morgan');
const sequelize = require("./config/config");
const bodyParse = require('body-parser')
const session = require('express-session');

const app = express();
const port = 3000;

// 세션
const SEC = 1000;
const HOUR = 60 * 60 * SEC;

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true}))

sequelize.sync()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

// routes
const mainRouter = require('./routes/main')
const userRouter = require('./routes/user')
const questionRouter = require('./routes/question')
const companyRouter = require('./routes/company')
const diaryRouter = require('./routes/diary')
const selfTestResultRouter = require('./routes/self-test-result')

// router - 진입할 엔드포인트 + 진입할 라우터
app.use('/main', mainRouter)
app.use('/users', userRouter)
app.use('/questions', questionRouter)
app.use('/companies', companyRouter)
app.use('/diaries', diaryRouter)
app.use('/self-test-results', selfTestResultRouter)

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session 기초 세팅 
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
      // maxAge: 10 * sec
      maxAge: HOUR
  }
}));

app.listen(port, () => {
  console.log(port, '번 포트에서 대기 중');
});