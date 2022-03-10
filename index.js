//Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
let currentUserType = 'manager';
let currentEmployeeName = 'John Smith'
let varManagerName = [];
let htmlStart = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css" />
    <title>Team Generator</title>
    
</head>
<body>
    <header>
        <h1>My Team</h1>
    </header>

    <main>
        <div class="row justify-content-center mx-auto">`

let htmlEnd =
`       </div>
    </main>
    
</body>
</html>`
let cssData = 
`* {
    font-family: Arial, Helvetica, sans-serif
}
main{
    max-width: 1200px;
    margin: auto;
}
header{
    background-color: rgb(208, 226, 241);
    margin: auto;
    text-align: center;
    padding: 30px;
}
.card{
    max-width: 300px;
    min-width: 255px;
    margin: auto;
    background-color: rgb(240, 240, 240);
    border: none;
}
.card-title {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}`

//function to write the beginning of html output
function writeHTMLStart(fileName, data){
    fs.writeFile(`./dist/${fileName}`, data, (err) => {
        if (err)
          console.log(err);
        else {
            return;
        };
    });
};

//function to write a file to the output/dist folder
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, (err) => {
        if (err)
          console.log(err);
        else {
        //   console.log(`File written successfully\n`);
        //   console.log(`${fileName} was written with the following contents:`);
        //   console.log(fs.readFileSync(`./dist/${fileName}`, "utf8"));
        };
    });
};

//function to append a file in the output/dist folder
function appendToFile(fileName, data){
    fs.appendFile(`./dist/${fileName}`, data, (err) => {
        if (err)
            console.log(err);
        else {
            // console.log("File appended successfully\n");
            // console.log(`${fileName} now has the following contents:`);
            // console.log(fs.readFileSync(`./dist/${fileName}`, "utf8"));
        };
    });
};

//initialize app
async function init() {
    writeHTMLStart("index.html", htmlStart);
    varManagerName = await inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'Enter Team Manager name:',
            default: 'MGR First Last',
        },
    ]);
    currentEmployeeName = varManagerName.managerName;
    let userData = userDetail();
};

//function to get data from inquirer
async function userDetail(){
    //set array of questions
    const questions = [
        {
            type: 'input',
            message: "Assign a unique employee ID:",
            name: 'employeeID',
            default:'1',
        },
        {
            type: 'input',
            message: "Enter user email:",
            name: 'email',
            default:'email@email.com',
        },
        {//will be used when engineer is selected
            type: 'input',
            message: "Enter Engineer GitHub user name:",
            name: 'github',
            default:'mytestuser',
            when: currentUserType === 'engineer',
        },
        {//will be used when manager is selected
            type: 'input',
            message: "Enter office phone number:",
            name: 'officeNumber',
            default:'555-867-5309',
            when: currentUserType === 'manager',
        },
        {//will be used when intern is selected
            type: 'input',
            message: "Enter school name:",
            name: 'school',
            default:'Princeton',
            when: currentUserType === 'intern',
        },
    ];
    await inquirer
    .prompt(questions)
    .then((response) => {
        let userData = { userName:`${currentEmployeeName}`, userType:`${currentUserType}`};
        let fullUserData = {...response, ...userData};
        if (fullUserData.userType === 'manager'){
            const { employeeID, email, officeNumber, userName, userType } = fullUserData;
            let htmlCard =
            `<div class="col-md-4 px-0">
                <div class="card shadow mt-5">
                    <h4 class="card-title bg-primary text-white pt-4 pb-4 font-weight-bold" >
                        <div class="ml-3 pb-3">${userName}</div>
                        <div class="ml-3 font-weight-normal">&#9749; Manager</div>
                    </h4>
                    <ul class="list-group list-group-flush m-4 border border-dark">
                        <li class="list-group-item">ID: ${employeeID}</li>
                        <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                        <li class="list-group-item">Office #: ${officeNumber}</li>
                    </ul>
                </div>
            </div>`
            appendToFile('index.html',htmlCard);
        }
        else if (fullUserData.userType === 'engineer'){
            const { employeeID, email, github, userName, userType } = fullUserData;
            let htmlCard =
            `<div class="col-md-4 px-0">
                <div class="card shadow mt-5">
                    <h4 class="card-title bg-primary text-white pt-4 pb-4 font-weight-bold" >
                        <div class="ml-3 pb-3">${userName}</div>
                        <div class="ml-3 font-weight-normal">&#128208; Engineer</div>
                    </h4>
                    <ul class="list-group list-group-flush m-4 border border-dark">
                        <li class="list-group-item">ID: ${employeeID}</li>
                        <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                        <li class="list-group-item">GitHub: <a href="https://github.com/${github}" target="_blank">${github}</a>
                    </ul>
                </div>
            </div>`
            appendToFile('index.html',htmlCard);
        }
        else if (fullUserData.userType === 'intern'){
            const { employeeID, email, school, userName, userType } = fullUserData;
            let htmlCard =
            `<div class="col-md-4 px-0">
                <div class="card shadow mt-5">
                    <h4 class="card-title bg-primary text-white pt-4 pb-4 font-weight-bold" >
                        <div class="ml-3 pb-3">${userName}</div>
                        <div class="ml-3 font-weight-normal">&#127891; Intern</div>
                    </h4>
                    <ul class="list-group list-group-flush m-4 border border-dark">
                        <li class="list-group-item">ID: ${employeeID}</li>
                        <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                        <li class="list-group-item">School: ${school}</li>
                    </ul>
                </div>
            </div>`
            appendToFile('index.html',htmlCard);
        }
    });
    let nextConf = nextConfirm();

};

//function to ask what the user wants to do next after each user data inquirer
async function nextConfirm(){
    await inquirer
    .prompt([
        {
            type: 'list',
            message: "Select your next step",
            name: 'nextStep',
            choices:['Add Engineer', 'Add Intern', 'Finish Building My Team'],
        },
        {
            type: 'input',
            message: "Enter Engineer's Name:",
            name: 'userName',
            default:'ENG First Last',
            when: (input) => input.nextStep === 'Add Engineer',
        },
        {
            type: 'input',
            message: "Enter Intern's Name:",
            name: 'userName',
            default:'INT First Last',
            when: (input) => input.nextStep === 'Add Intern',
        },
    ])
    .then((response) => {
        if (response.nextStep === 'Finish Building My Team'){
            appendToFile("index.html", htmlEnd);
            writeToFile("style.css", cssData);
            console.log("Team Profile Website generation complete...\nIndex.html availble here: ./dist/");
            return 'end';
        }
        else if (response.nextStep === 'Add Engineer') {
            currentUserType = 'engineer';
            currentEmployeeName = response.userName;
            userDetail();
        }
        else{
            currentUserType = 'intern';
            currentEmployeeName = response.userName;
            userDetail();
        };
    });
};

//initialize app
init();