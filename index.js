const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const questions = [
  {
      type: "input",
      name: "name",
      message: "What is your Github username?"
  },
  {
      type: "input",
      name: "color",
      message: "What color would you like for your Github PDF?"
  }
];
function promptUser(){
    return inquirer.prompt(questions);
}
promptUser();
function writeToFile(fileName, data) {
 
}

function init() {
}
init();
