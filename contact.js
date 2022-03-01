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

var questions = [
    {
      type: 'input',
      name: 'name',
      number: 'number',
      email: 'email',
      message: "What are your details?",
    }
  ]
  inquirer.prompt(questions).then(answers => {
    console.log(`Hi ${answers['name']} ${answers['number']}!`)
  }}