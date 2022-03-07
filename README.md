# DU-HW10-Team-Profile-Generator

DU Coding Bootcamp Homework 10: Team Profile Generator

# node.js application
This is a node.js script that will generate a file on the local filesystem of the server in the **OUTPUT directory**. It writes to local storage and does not have functionality built in to clear the local storage objects.

Github Repository Address: <https://github.com/GittinIt6/DU-HW10-Team-Profile-Generator>

## Instructions
1. Ensure you have downloaded and installed node.js and have rebooted your system (if Windows)
2. Clone repository to your system.
3. From a terminal, ensure you are in the index.js directory
4. Run:
~~~
npm i
node index.js
~~~
5. A rendered output of readme.md will be saved into your **output** directory

## Purpose

This application is specific to anyone that wants to generate a professional ReadMe file for a GitHub Repository

## Audience

The intended audience is an individual that would like to generate a readme file with standard info. The user of this site does need to have a technical background, and *should* understand node.js capabilities.

## Technical Detail

This application uses node.js with **FS** and **require**.

The files are configured as follows:
```
Root Directory
│
│ --index.js
│ --package.json
│
└───output (folder)
      --your rendered readme.md
```
>**node.js**: This site uses node.js

>**FS**: This site uses node.js built in FS

>**requireJS**: This site uses requireJS <https://requirejs.org/>

![video of the application at work](./git-files/DU-HW9-GIF.gif)

## Revision History 

1. This application was created in March 2022 as part of a bootcamp assignment. It was created using starter code provided by the instructor.