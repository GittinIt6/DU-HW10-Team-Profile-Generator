//Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
// const { json } = require('stream/consumers');
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

function writeHTMLStart(fileName, data){
    fs.writeFile(`./dist/${fileName}`, data, (err) => {
        if (err)
          console.log(err);
        else {
            return;
        };
    });
};

//Function to write index.html file
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
//Create a function to initialize app
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
    // console.log('finished user detail');


//     await inquirer
//     .prompt(questions)
//     .then((response) => {
//         // response.confirm === response.password,
//         // console.log(response)
//         // let names = questions.map(({ name }) => name).join(', ');
//         const { title, description, instructions, userType, techKnowledge, technologies, revHistory, contribute, email, license, git } = response;
//         let htmlData = 
// `# ${title}
// ## Description
// ${description}

// ## Table of Contents
// -[Description](#description)<br>
// -[Instructions](#instructions)<br>
// -[Intended Audience](#audience)<br>
// -[Tech](#technologies-used)<br>
// -[Revisions](#revision-history)<br>
// -[Contribute](#contribute)<br>
// -[Contact](#contact)<br>
// -[License](#license)

// ## Instructions
// ${instructions}

// ### Audience
// ~~~
// Intended audience: ${userType}
// Should the user of this site need to have a technical background: ${techKnowledge}
// ~~~

// ## Technologies Used
// >${technologies.join(' | ')}

// ## Revision History 
// *${revHistory}*

// ### **Contribute**
// To contribute, please ${contribute}.

// ### Contact
// You can email me at <${email}>

// Please see my GitHub profile at <https://www.github.com/${git}>

// ### License
// ${license}`;

//     appendToFile("index.html", htmlData);
//     });
};

async function userDetail(){
    const questions = [
        // {
        //     type: 'input',
        //     message: "Enter the Team Manager's name:",
        //     name: 'managerName',
        //     default:'Enter Name',
        // },
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
        // {
        //     type: 'input',
        //     message: "Enter the Teammate's name:",
        //     name: 'userName',
        //     default:'Enter Name',
        // },
        {
            type: 'input',
            message: "Enter Engineer GitHub user name:",
            name: 'github',
            default:'mytestuser',
            when: currentUserType === 'engineer',
        },
        {
            type: 'input',
            message: "Enter office phone number:",
            name: 'officeNumber',
            default:'555-867-5309',
            when: currentUserType === 'manager',
        },
        {
            type: 'input',
            message: "Enter school name:",
            name: 'school',
            default:'Princeton',
            when: currentUserType === 'intern',
        },
        // {
        //     type: 'list',
        //     message: "Select the type of employee to create:",
        //     name: 'createType',
        //     choices:['Employee', 'Manager', 'Engineer', 'Intern'],
        // },
    ];
    await inquirer
    .prompt(questions)
    .then((response) => {
        let userData = { userName:`${currentEmployeeName}`, userType:`${currentUserType}`};
        let fullUserData = {...response, ...userData};
        // console.log(`response data is ${JSON.stringify(response)}`);
        // console.log(`userData user data is ${JSON.stringify(userData)}`);
        // console.log(`full user data is ${JSON.stringify(fullUserData)}`);
        // console.log(fullUserData);
        if (fullUserData.userType === 'manager'){
            const { employeeID, email, officeNumber, userName, userType } = fullUserData;
            // console.log(`${employeeID} ${email} ${officeNumber} ${userName} ${userType}`);
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
            // console.log(`${currentUserType} is currentusertype`);
            currentEmployeeName = response.userName;
            userDetail();
            // return response.userName;
        }
        else{
            currentUserType = 'intern';
            currentEmployeeName = response.userName;
            userDetail();
            // return response.userName;
        };
    });
};

//initialize app

init();