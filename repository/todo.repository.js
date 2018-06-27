module.exports = function todoRepository(db) {
    return {
        create,
        list,
        remove,
    };

    async function create(task) {
        const query = `INSERT INTO tasks (taskName, date) VALUES ("${task}", DATE(NOW()))`;

        return execRawQuery(query);
    }

    async function list() {
        let sql = 'SELECT * FROM tasks';

        return await execRawQuery(sql);
    }

    async function remove(id) {
        const sql = `DELETE FROM tasks WHERE id = ${id}`;

        return await execRawQuery(sql);
    }

    function execRawQuery(sql) {
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) return reject(err);

                return resolve(result);
            })
        });
    }
};

