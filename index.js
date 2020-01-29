const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const colors = require("./generateHTML")
const generateHTML = require("./generateHTML");
const writeFileAsync = util.promisify(fs.writeFile);

//function that prompts the user what their github user name is and sets it as a constant userNameInput
function userNameInput(){
    const username = inquirer.prompt({
        type: "input",
        name: "username",
        message:"What is your Github username?"
    });
    return username;
}
//function that prompts the user what their color choice is out of the four options
function userColorChoice(){
    const color = inquirer.prompt({
        type: "list",
        name: "color",
        message: "What color would you like your PDF to be?",
        choices: ["Green", "Blue", "Pink", "Red"]
    });
    return color;
}
//Calls the api and assigns the value to be username
function githubAPICall(username){
    let data = axios.get(`https://api.github.com/users/${username}`)
    return data;
}
//async function always returns with a promise 
async function init(){
    //try test for errors that are within the block
    try{
        // After userNameInputs function is executed, assign its value to let to an object
        let {username} = await userNameInput();
        // As the same as the call above it. After userColorChoice() function is executed. Take the color choice and assigns it to an object
        const {color} = await userColorChoice();
        
        let {data} = await githubAPICall(username);
         //this data.color = color is for generateHTML.js to use
        data.color = color;
        const html = generateHTML(data);
        writeFileAsync("index.html", html).then(function() {
      console.log("Successfully wrote to index.html");
    })
    }
    //if the error is outside of the try block it would trip catch
    catch(err){
        console.log(err);
    }
}
init();