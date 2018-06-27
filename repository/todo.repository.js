const mysql = require('mysql');

// Create connection
const dataB = mysql.createConnection({
  host: '192.168.99.100',
  user: 'root',
  password: 'parola',
  database: 'taskDb',
});

// Connect
dataB.connect((err) => {
  if (err) {
    throw err;
  }
});

module.exports = function todoRepository() {
  return {
    create,
    list,
    remove,
    createTable,
  };

  async function createTable() {
    const sql = 'CREATE TABLE tasks(id int AUTO_INCREMENT, taskName VARCHAR(255), date DATE, PRIMARY KEY(id))';
    return new Promise((resolve, reject) => {
      dataB.query(sql, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  async function create(task) {
    const query = `INSERT INTO tasks (taskName, date) VALUES ("${task}", DATE(NOW()))`;
    return new Promise((resolve, reject) => {
      dataB.query(query, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  async function list() {
    const query = 'SELECT taskName, date FROM tasks;';
    return new Promise((resolve, reject) => {
      dataB.query(query, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }

  // Delete post
  async function remove(id) {
    const sql = `DELETE FROM  tasks WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
      dataB.query(sql, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }
};
