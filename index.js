const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const colors = require("./generateHTML")
const generateHTML = require("./generateHTML");
const writeFileAsync = util.promisify(fs.writeFile);

 function promptUser(){
   return inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your Github username?"
    },
    {
      type: "list",
      name: "color",
      message: "What color would you like for your Github PDF?",
      choices:["Green","Blue","Pink","Red"]
    }
     ]);
}
function githubPull(){
    const queryURL = axios.get(`https://api.github.com/users/${username}`)
    return queryURL;
}

// promptUser().then(function(data){
    
//     const html = generateHTML(data);
//     return writeFileAsync("index.html", html);
// }).then(function(){
//     console.log("Success!");
// })
// .catch(function(err){
//     console.log(err);
// });
async function init(){
    try{
        const data = await promptUser();
        const html = generateHTML;
        
        await writeFileAsync("index.html", html);
        console.log("Success!");
    }catch(err){
        console.log(err);
    }
}
init();








// function test(){
//     console.log(username);
//     console.log(color);
// }
// promptUser()
// .then(function({ username }){
//     const queryURL = `https://api.github.com/users/${username}`;
//     console.log(generateHTML);
//     axios
//     .get(queryURL)
//     .then(function(res){
//         const repoName = res.data.name;
//         const followerCount = res.data.followers;
//         const followingCount = res.data.following;
//     }).then(function(answer){
//         const html = generateHTML(answer);
//         return writeFileAsync("test.html", html);
//     });
    
// }).catch(function(err){
//     console.log(err);
// });
