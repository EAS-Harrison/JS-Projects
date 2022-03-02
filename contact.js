const { create } = require('domain')
const inquirer = require('inquirer')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  {
    var contacts = [] // this will be repeated for every contact obviously with real data.

        inquirer
        .prompt("Do you want to: Create,Update,or Delete?")
        .then(answers => {}
        )}
        switch(method) {
            case "Create":
              create()
              break;
            case "Update":
              update()
              break;
            case remove:
              remove()
            break;  
            default:
                console.log('Not an option')
                return;
        }
        const create = () => {
            console.log('Create a contact')
        }
        
        const update = () => {
            console.log('Update a contact')
        }
        
        const remove = () => {
            console.log('Remove a contact')
        }