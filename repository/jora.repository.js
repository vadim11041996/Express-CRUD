module.exports = function joraRepository(mongoose) {
    var TaskModel = require('../jora');
    var objTaskModel = new TaskModel();

    return {
        create,
        list,
        remove,
    };
   
      function create(newTask) {
        return  TaskModel.create(newTask);
    }
    
    async function list() {
        return  TaskModel.find();
    }

    async function remove(taskId) {
        return  TaskModel.remove({ _id: taskId});
    }
};

