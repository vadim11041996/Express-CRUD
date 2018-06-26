module.exports = function todoRepository(db) {
    return {
        create,
        list,
        remove,
    };

    async function create(task) {
        task = Object.assign({}, task, {id: db.length+ 1});
        db.push(task);
        return task;
    }

    async function list() {
        return  db;
    }

    async function remove(id) {
        var start =  db.findIndex((task) => {
            console.log('task', task, id);
            return task.id == id;
        });
        db.splice(start,1)
        console.log("Jora are start : "+ start);
        return 1;
    }
};

