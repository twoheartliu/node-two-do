const db = require('../db.js');
const fs = require('fs');
jest.mock('fs');

describe('db', () => {
  it('should read', async function () {
    const data = [{title: 'hello', done: true}];
    fs.setReadMocks('/xxx', null, JSON.stringify(data));
    const list = await db.read('/xxx');
    // 测试复杂类型是否相等需要使用 toStrictEqual
    expect(list).toStrictEqual(data);
  });
  it('should write', async function () {
    let fakeFile;
    fs.setWriteFileMock('/yyy', (path, data, callback) => {
      fakeFile = data;
      callback(null);
    });
    const list = [{title: 'hi', done: false}];
    await db.write(list, '/yyy');
    expect(fakeFile).toBe(JSON.stringify(list) + '\n');
  });
});