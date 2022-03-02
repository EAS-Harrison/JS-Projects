const inquirer = require('inquirer')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
    var contacts = [] // this will be repeated for every contact obviously with real data.
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
            ],
        }
    ])
    console.log(choice)
}

main()
      
if ((choice) = ('Create a contact')){
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
    {
      name: 'email',
      message: 'What is your contacts email?',
    },
  
  ])
  .then(answers => {
    console.log(`Name: ${answers['name']} Number: ${answers['number']} Email: ${answers['email']}`);
  });
}