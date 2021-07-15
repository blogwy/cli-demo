const inquirer = require('inquirer');
const os = require('os');

module.exports = function (projectName) {
  return inquirer.prompt([
    {
      name: 'projectName',
      message: 'Please enter the project name',
      default: projectName
    },
    {
      name: 'projectVersion',
      message: 'Please enter the version number of the project',
      default: '1.0.0'
    },
    {
      name: 'projectDescription',
      message: 'Please enter a brief description of the project',
      default: 'This is an aiotv component'
    },
    {
      name: 'projectAuthor',
      message: 'Please enter the author of the project',
      default: os.userInfo().username
    }
  ])
}
