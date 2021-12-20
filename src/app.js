const cookieSession = require('cookie-session');
const express = require('express');
const answerQuizzRouter = require('./routers/quizzRouters/answer-quizz.js');
const addQuestionRouter = require('./routers/quizzRouters/add-question.js');
const createQuizzRouter = require('./routers/quizzRouters/create.js');
const getQuizzesRouter = require('./routers/quizzRouters/list-quizzes.js');
const removeQuestionRouter = require('./routers/quizzRouters/remove-question.js');
const removeQuizzRouter = require('./routers/quizzRouters/remove-quizz.js');
const showQuizzRouter = require('./routers/quizzRouters/show-quizz.js');
const signinRouter = require('./routers/userRouters/signin.js');
const signoutRouter = require('./routers/userRouters/signout.js');
const signupRouter = require('./routers/userRouters/signup.js');
require('./db/mongoose.js');

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    name: 'access_token',
    //httpOnly: true,
    secure: false, //process.env.NODE_ENV === 'production',
    signed: false,
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(createQuizzRouter);
app.use(getQuizzesRouter);
app.use(showQuizzRouter);
app.use(addQuestionRouter);
app.use(removeQuestionRouter);
app.use(removeQuizzRouter);
app.use(answerQuizzRouter);

app.get('*', (req, res) => {
  res.status(404).send('Error: Not Found');
});

module.exports = app;
