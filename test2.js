//testycles
'use strict';
const inquirer = require('inquirer');
const fs = require('fs');
let contactsarray = []
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
      ]}
])

  console.log(choice)
  switch (choice) {
    case 'Create a contact':
      create()
      break;
    case 'Delete a contact':
      remove()
      break;
    case 'Update a contact':
      update()
      break;
    case 'Get contact by name':
      search()
      break;
    case 'Get all contacts':
      all()
      break;
  }
}
main()
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

    contactsarray.push(answers)
    try {
      fs.writeFileSync('/Users/harrisonsheard/JS-Projects/JS-Projects/arrayfile.json', JSON.stringify(contactsarray, null, 2))
    } catch (err) {
      console.error(err)
    }
    main()
  });
}
function remove() {
  let removeQuestions = [{
    type: "list",
    name: "name",
    message: "Pick a contact to remove.",
    choices: contactsarray.map(contact => {
      return contact.full_name
    }),
  }]
  inquirer.prompt(removeQuestions).then((answers) => {
    contactsarray = contactsarray.filter(contact => contact.full_name != answers.name);
    try {
      fs.writeFileSync('/Users/harrisonsheard/JS-Projects/JS-Projects/arrayfile.json', JSON.stringify(contactsarray, null, 2))
    } catch (err) {
      console.error(err)
    }
    main()
  })
}
function search() {
  let searchQuestions = [{
    type: "input",
    name: "name",
    message: "Enter the name of the contact you are looking for.",
  }]

  inquirer.prompt(searchQuestions).then((answers) => {
    for (var i = 0; i < contactsarray.length; i++) {
      if (contactsarray[i].full_name === answers.name) {
        console.log(contactsarray[i])
      }
    }
    main()
  })
}
function update() {
  let updateQuestions = [
    {
      type: 'list',
      name: 'full_name',
      message: "Pick a contact to update.",
      choices: contactsarray.map(contact => {
        return contact.full_name
      }),
    },
    {
      type: 'input',
      name: 'phone',
      message: "What's your new phone number?",
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
  inquirer.prompt(updateQuestions).then((answers) => {
    contactsarray = contactsarray.filter(contact => contact.full_name != answers.full_name);
    contactsarray.push(answers);
    try {
      fs.writeFileSync('/Users/harrisonsheard/JS-Projects/JS-Projects/arrayfile.json', JSON.stringify(contactsarray, null, 2))
    } catch (err) {
      console.error(err)
    }
    main()
  });
}
function all() {
  console.log(contactsarray)
  main()
}