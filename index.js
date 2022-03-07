//Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

//Create an array of questions for user input

const questions = [
    {
        type: 'input',
        message: "What is the title of your application?",
        name: 'title',
        default:'Just a Title',
    },
    {
        type: 'input',
        message: "Provide a description of your application:",
        name: 'description',
        default:'Just a Description',
    },
    {
        type: 'input',
        message: "Provide usage or installation instructions:",
        name: 'instructions',
        default:'Do some things',
    },
    {
        type: 'input',
        message: "Who would be a user of this application?",
        name: 'userType',
        default:'Application Programmer',
    },
    {
        type: 'input',
        message: "Should the user have technical knowledge?",
        name: 'techKnowledge',
        default:'Yes',
    },
    {
        type: 'checkbox',
        message: "Select the technology that your site uses:",
        name: 'technologies',
        choices:['HTML','CSS','JavaScript','node.js','bootstrap','Moment','External API','Other'],
    },
    {
        type: 'input',
        message: "Please explain where in the revision history this application:",
        name: 'revHistory',
        default:'Initial deployment',
    },
    {
        type: 'input',
        message: "How can someone contribute to this project?",
        name: 'contribute',
        default:'e-mail me',
    },
    {
        type: 'input',
        message: "What is your e-mail address?",
        name: 'email',
        default:'email@email.com',
    },
    {
        type: 'list',
        message: "Choose a license:",
        name: 'license',
        choices:['None','MIT License','Apache License 2.0','GNU General Public License 2.0','Other'],
    },
    {
        type: 'input',
        message: "What is your GitHub user name?",
        name: 'git',
        default:'mytestuser',
    },
];

//Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("./dist/index.html", "utf8"));
        };
    });
};
//Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((response) => {
        // response.confirm === response.password,
        // console.log(response)
        // let names = questions.map(({ name }) => name).join(', ');
        const { title, description, instructions, userType, techKnowledge, technologies, revHistory, contribute, email, license, git } = response;
        let htmlData = 
`# ${title}
## Description
${description}

## Table of Contents
-[Description](#description)<br>
-[Instructions](#instructions)<br>
-[Intended Audience](#audience)<br>
-[Tech](#technologies-used)<br>
-[Revisions](#revision-history)<br>
-[Contribute](#contribute)<br>
-[Contact](#contact)<br>
-[License](#license)

## Instructions
${instructions}

### Audience
~~~
Intended audience: ${userType}
Should the user of this site need to have a technical background: ${techKnowledge}
~~~

## Technologies Used
>${technologies.join(' | ')}

## Revision History 
*${revHistory}*

### **Contribute**
To contribute, please ${contribute}.

### Contact
You can email me at <${email}>

Please see my GitHub profile at <https://www.github.com/${git}>

### License
${license}`;

    writeToFile("index.html", htmlData);
    });
};

//initialize app
init();