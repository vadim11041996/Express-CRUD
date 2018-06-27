module.exports = function todoRepository(ram) {
  return {
    create,
    list,
    remove,
  };

  async function create(task) {
    const temp = Object.assign({}, task, {
      id: ram.length + 1,
    });
    ram.push(temp);
    return temp;
  }

  async function list() {
    return ram;
  }

  async function remove(id) {
    const start = ram.findIndex((task) => {
      console.log('task', task, id);
      return task.id === id;
    });
    ram.splice(start, 1);
    console.log(`Start : ${start}`);
  }
};
