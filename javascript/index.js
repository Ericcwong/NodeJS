const inquirer = require("inquirer");
const fs = require("fs-extra");
const util = require("util");
const axios = require("axios");
const puppeteer = require("puppeteer");
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
function githubAPIStar(username){
    let gitStars = axios.get(`https://api.github.com/users/${username}/starred`)
    return gitStars
}


//async function always returns with a promise 
async function init(){
    //try test for errors that are within the block
    try{
        // After userNameInputs function is executed, assign its value to let to an object
        let {username} = await userNameInput();
        // As the same as the call above it. After userColorChoice() function is executed. Take the color choice and assigns it to an object
        const {color} = await userColorChoice();
        //calls the api and assigns the username to the value and then assigns it to data.
        let {data} = await githubAPICall(username);
        let gitStars = await githubAPIStar(username);
        let gitStarsLength = gitStars.data.length
         //this data.color = color is for generateHTML.js to use. Has to be put below let{data} or else it doesnt know what data is
        data.color = color;
        data.gitStarsLength = gitStarsLength;
        const html = generateHTML(data);
        writeFileAsync("index.html", html).then(function() {
        console.log("Successfully wrote to index.html");
        


    });
    //Generate PDF through puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);
    await page.emulateMedia("screen");
    await page.pdf({
        path: `${username}.pdf.pdf`,
        format: "A4",
        printBackground: true 

    });
    console.log("Successfully created PDF file.");
    await browser.close();
    process.exit();
    }
    //if the error is outside of the try block it would trip catch
    catch(err){
        console.log(err);
    }
}
init();