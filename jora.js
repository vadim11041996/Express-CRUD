const mongoose = require('mongoose');
const port = process.env.PORT || 4003;

const config = require('./config/config');

if (config.adapter == "mysql") {
    const mysql = require('mysql');

    const db = mysql.createConnection(config.mysql);

    db.connect(loadApplication);

    function loadApplication(err) {
        if (err) throw err;

        const app = require('./app')(db);
        console.log("connected to mysql db")
        app.listen(port, () => {
            console.log('Server started on: ' + port);
        });
    }

} else if (config.adapter == "mongo") {
    mongoose.connect(config.mongo);

    const TaskSchema = mongoose.Schema({
        taskName: { type: String, required: true },
        posted: { type: Date, default: Date.now },
    }, { collection: 'task' });

    const TaskModel = mongoose.model('TaskModel', TaskSchema);

    mongoose.connection.on('connected', (err) => {
        if (err) throw err;
        const app = require('./joraApp');

        console.log('Connected to mongo database');

        app.listen(port, () => {
            console.log(`Server started on: ${port}`);
        });
    });
    module.exports = TaskModel;
}