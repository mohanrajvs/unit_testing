const unitTestingTask = require("./unitTestingTask.js");

const format = unitTestingTask.lang("ru");
const customRegister = unitTestingTask.register("defualt", "MMMM dd A");
console.log(customRegister("HH:DD", Date.now()));
