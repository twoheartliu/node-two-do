const db = require('./db.js');

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
}

module.exports.showAll = async () => {
  console.log('show all');
}