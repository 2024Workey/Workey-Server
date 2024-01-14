const express = require('express');
const path = require('path');
const morgan = require('morgan');
const sequelize = require("./config/config");
const bodyParse = require('body-parser')

const app = express();
const port = 3000;

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
const userRouter = require('./routes/user')
const questionRouter = require('./routes/question')
const companyRouter = require('./routes/company')
const diaryRouter = require('./routes/diary')
const selfTestResultRouter = require('./routes/self-test-result')

// router
app.use('/users', userRouter)// 진입할 엔드포인트 + 진입할 라우터
app.use('/questions', questionRouter)// 진입할 엔드포인트 + 진입할 라우터
app.use('/companies', companyRouter)// 진입할 엔드포인트 + 진입할 라우터
app.use('/diaries', diaryRouter)// 진입할 엔드포인트 + 진입할 라우터
app.use('/self-test-results', selfTestResultRouter)// 진입할 엔드포인트 + 진입할 라우터

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
  console.log(port, '번 포트에서 대기 중');
});