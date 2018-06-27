const mysql = require('mysql');

//Create connection
const dataB = mysql.createConnection({
    host     : '192.168.99.100',
    user     : 'root',
    password : 'parola',
    database : 'taskDb'
});

//Connect
dataB.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySQL connected');
});

module.exports = function todoRepository(db) {
    return {
        create,
        list,
        remove,
        createTable,
    };

    async function createTable() {
        let sql = 'CREATE TABLE tasks(id int AUTO_INCREMENT, taskName VARCHAR(255), date VARCHAR(255), PRIMARY KEY(id))';
        dataB.query(sql, (err, result)=>{
            if(err) throw err;
            console.log(result);
            return 1;
        });
    }

    async function create(task) {
        task = Object.assign({}, task, {id: db.length+ 1});
        db.push(task);
        return task;
    }

    async function list() {
        return  db;
    }

    //Delete post
    async function remove(id) {
        let sql = `DELETE FROM  tasks WHERE id = ${id}`;
        let query = dataB.query(sql, (err, result)=> {
            if (err) throw err;
            console.log(result);
        });
        return 1;
    }
};

