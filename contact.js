const inquirer = require('inquirer')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  {
    var contacts = [{
         "created_contact":{
            "name": "",
            "number": "",
            "email": "" }
        }] // this will be repeated for every contact obviously with real data.

        inquirer
        .prompt([
          {
            name: 'name',
            message: 'What is your contacts name?',
          },
          {
            name: 'number',
            message: 'What is your contacts number?',
          },
        ])
        .then(answers => {
          console.log(`Name: ${answers["name"]} , Number: ${answers["number"]}`)
        })}