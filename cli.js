const { program } = require('commander');
const api = require('./index.js');


program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(1).join(' ');
    api.add(words).then(() => {console.log('添加成功')}).then(() => {console.log('添加失败')});
  });

program
  .command('clear')
  .description('clear all task')
  .action(() => {
    api.clear();
    console.log('clear all');
  });


if (process.argv.length === 2) {
  console.log('process');
  // 说明用户没有传任何参数
  api.showAll();
}
program.parse(process.argv);
