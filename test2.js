//testycles
'use strict';
const inquirer = require('inquirer');
const main = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What do you want to do?',
            choices: [
                'Create a contact',
                'Update a contact',
                'Delete a contact',
                'Get contact by name',
                'Get all contacts',
            ],
        }
    ])
    console.log(choice)
    switch(choice){
        case 'Create a contact':
        create()
        break;
    
    }
    }

main()



var contacts = []
const questions = [
  {
    type: 'input',
    name: 'full_name',
    message: "What's your contacts full name?",
    default() {
      return 'John Doe';
    },
  },
  {
    type: 'input',
    name: 'email',
    message: "What's your contacts email address?",
  },
 
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number",
    validate(value) {
      const pass = value.match(
        /^([07]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      } 

      return 'Please enter a valid phone number';
    },
  },
];
function create() {
inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, '  '));
    contacts.push(answers);
});
}