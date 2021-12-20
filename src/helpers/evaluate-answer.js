const evaluateMultiAnswer = (studentAnswer, correctAnswer) => {
  if (studentAnswer.length !== correctAnswer.length) {
    return false;
  }
  let dic = {};
  correctAnswer.forEach((e) => {
    dic[e] = 1;
  });
  let match = true;
  studentAnswer.forEach((e) => {
    if (!dic.hasOwnProperty(e)) {
      match = false;
      return;
    }
  });
  return match;
};

const evaluateAnswer = (questions, studentAnswers) => {
  let grade = 0;
  let match = false;
  questions.forEach((element) => {
    if (!studentAnswers[element._id]) {
      return;
    } else if (element.answerType === 'multi') {
      const studentAns = studentAnswers[element._id].answer;
      const correctAns = element.correctAnswer[element.answerType];
      match = evaluateMultiAnswer(studentAns, correctAns);
      grade += match ? 1 : 0;
    } else {
      match =
        element.correctAnswer[element.answerType] ==
        studentAnswers[element._id].answer;
      grade += match ? 1 : 0;
    }
  });
  return grade;
};

module.exports = evaluateAnswer;
