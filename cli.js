const { Command } = require('commander');
const api = require('./index.js');
const program = new Command();

program
  .option('-x, --xxx', 'what the x')

program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(1).join(' ');
    api.add(words);
  });

program
  .command('clear')
  .description('clear all task')
  .action(() => {
    console.log('clear all');
  });


program.parse(process.argv);
