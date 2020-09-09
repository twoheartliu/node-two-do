#!/usr/bin/env node
const meow = require('meow');
const api = require('./index.js');
const chalk = require('chalk');

const log = console.log.bind(console);

const cli = meow(`  
	Usage
	  $ cli [options] [command] more...

	Commands
	  add|a      add a task
	  clear|c    clearing all todos 

	Examples
	  $ node cli add 吃饭饭
	  $ node cli clear
`, {
  flags: {
    help: {
      alias: 'h'
    },
  }
});

const commands = cli.input;
switch (commands[0]) {
  case 'add':
  case 'a' : {
    const words = commands.slice(1).join(' ');
    api.add(words).then(() => {
      log(chalk.blue('添加成功！'));
    }, () => {
      log(chalk.red('添加失败！'));
    });
    break;
  }
  case 'clear':
  case 'c': {
    api.clear().then(() => {
      log(chalk.blue('清空成功！'));
    }, () => {
      log(chalk.red('清空失败！'));
    });
    break;
  }

  default: {
    if (commands.length === 0) {
      void api.showAll();
    } else {
      log(cli.help);
    }
  }
}

