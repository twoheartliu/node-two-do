const db = require('./db.js');
const inquirer = require('inquirer');
const chalk = require('chalk');

const log = console.log.bind(console);

module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read();
  // 往里面添加 title
  list.push({title, done: false});
  // 存储任务到文件
  await db.write(list);
};

module.exports.clear = async () => {
  await db.write([]);
};

function writeToList(list) {
  db.write(list).then(() => {
    log(chalk.blue('操作成功！'));
  }, () => {
    log(chalk.red('操作失败！'));
  })
}

function checkContent(obj) {
  if (obj.title.trim() === '') {
    throw Error(chalk.red('请输入不为空的内容！'));
  }
}

function askForCreateTask(list) {
  inquirer.prompt({type: 'input', name: 'title', message: '请输入'}).then((answer4) => {
    checkContent(answer4);
    list.push({
      title: answer4.title,
      done: false
    });
    writeToList(list);
  });
}

function markAsDone(list, index) {
  list[index].done = true;
  writeToList(list);
}

function markAsUndone(list, index) {
  list[index].done = false;
  writeToList(list);
}

function updateTitle(list, index) {
  inquirer.prompt({type: 'input', name: 'title', message: '请输入新任务', default: list[index].title}).then((answer3) => {
    checkContent(answer3);
    list[index].title = answer3.title;
    writeToList(list);
  });
}

function removeTask(list, index) {
  list.splice(index, 1);
  writeToList(list);
}

function askForAction(list, index) {
  const actions = {markAsDone, markAsUndone, updateTitle, removeTask};
  inquirer
    .prompt(
      {
        type: 'list',
        name: 'action',
        message: '请选择操作',
        choices: [
          {name: '退出', value: 'quit'},
          {name: '已完成', value: 'markAsDone'},
          {name: '未完成', value: 'markAsUndone'},
          {name: '修改', value: 'updateTitle'},
          {name: '删除', value: 'removeTask'},
        ]
      }
    ).then(answer2 => {
    const action = actions[answer2.action];
    action && action(list, index);
  });
}

function printTasks(list) {
  inquirer
    .prompt(
      {
        type: 'list',
        name: 'index',
        message: '请选择你想操作的任务',
        choices: [{name: '退出', value: '-1'}, ...list.map((task, index) => {
          return {name: `${task.done ? '[x]' : '[ ]'} ${index + 1} - ${task.title}`, value: index.toString()};
        }), {name: '+ 创建任务', value: '-2'}]
      }
    )
    .then((answer) => {
      const index = parseInt(answer.index);
      if (index >= 0) {
        // 说明选中了一个任务
        askForAction(list, index);
      } else if (index === -2) {
        // 创建任务
        askForCreateTask(list);
      }
    });
}

module.exports.showAll = async () => {
  const list = await db.read();
  // 打印之前的任务
  printTasks(list);
};

