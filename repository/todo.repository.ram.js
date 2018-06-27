module.exports = function todoRepository(ram) {
    return {
        create,
        list,
        remove,
    };

    async function create(task) {
        task = Object.assign({}, task, {id: ram.length+ 1});
        ram.push(task);
        return task;
    }

    async function list() {
        return  ram;
    }

    async function remove(id) {
        var start =  ram.findIndex((task) => {
            console.log('task', task, id);
            return task.id == id;
        });
        ram.splice(start,1);
        return 1;
    }
};

