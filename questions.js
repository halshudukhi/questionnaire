const collectAnswers = require("./lib/collectAnswers");

const questions = [
  "- What is your name? ",
  "- Are you a programmer by profession (y/n)? ",
  "- How many years of experience do you have? ",
  "* Please rate yourself from 1 to 10\n\t-Programming in Node js (1-10): ",
  "\t- Programming in Angular (1-10): ",
  "\t- Programming in React (1-10): ",
  "\t- Programming in React Native (1-10): ",
];

console.log("\n\t--- WELCOME TO THE QUESTIONNAIRE ---\n\n");
const answerEvents = collectAnswers(questions);

answerEvents.on("complete", answers => {
  console.log("\nThank you for your participation.\n", "Goodbye!");
});
answerEvents.on("complete", () => process.exit());
