const readline = require("readline");
const { EventEmitter } = require("events");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = (questions, done = f => f) => {
  const answers = [];
  const [firstQuestion] = questions;
  const emitter = new EventEmitter();

  const questionAnswered = answer => {
    emitter.emit("answer", answer);
    if (answers.length === 1 && (answer.trim().toLowerCase() !== "y" && answer.trim().toLowerCase() !== "yes" && answer.trim().toLowerCase() !== "n" && answer.trim().toLowerCase() !== "no")) {
      console.log("Oops!. Answer should be yes or no", "Try again\n");
      rl.question(questions[answers.length], questionAnswered);
    } else if (answers.length >= 3 && answers.length <= 6 && (answer > 10 || answer < 1)) {
      console.log("Oops!. Answer should be between 1 and 10", "Try again\n");
      rl.question(questions[answers.length], questionAnswered);
    } else {
      answers.push(answer);
      if (answers.length < questions.length) {
        emitter.emit("ask", questions[answers.length]);
        rl.question(questions[answers.length], questionAnswered);
      } else {
        emitter.emit("complete", answers);
        done(answers);
      }
    }

  };

  process.nextTick(() => {
    emitter.emit("ask", firstQuestion);
    rl.question(firstQuestion, questionAnswered);
  });

  return emitter;
};
