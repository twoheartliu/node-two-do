// 是系统默认的 home 目录
const homedir = require('os').homedir();
const p = require('path');
const fs = require('fs');
// home 是用户自己设置的 home 目录, 优先使用用户自己设置的，如果没有，则使用系统默认的
const home = process.env.HOME || homedir;
const dbPath = p.join(home, '.todo');

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, {flag: 'a+'}, (error, data) => {
        if (error) {
          return reject(error);
        }
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (error2) {
          list = [];
        }
        resolve(list);
      });
    });
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list);
      fs.writeFile(path, string + '\n', (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }
};
module.exports = db;