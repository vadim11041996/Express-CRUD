const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = function(mongoose){
    const app = express();
    const joraRepository = require('./repository/jora.repository');
    const joraRoutes = require('./routes/joraRoutes')(joraRepository());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.use('/tasks/api', joraRoutes);

    return app;

};
