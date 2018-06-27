const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = function (db) {
    const app = express();
    const todoRepository = require('./repository/todo.repository')(db);
    const crudTasks = require('./routes/todo-routes')(todoRepository);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/tasks/api', crudTasks);

    return app;
};
