const mysql = require('mysql');

const db = mysql.createConnection({
  host: '192.168.99.100',
  user: 'root',
  password: 'parola',
  database: 'taskDb',
});

const port = process.env.PORT || 3000;

db.connect(loadApplication);

function loadApplication(err) {
  if (err) throw err;

  const app = require('./app')(db);

  app.listen(port, () => {
    console.log(`Server started on: ${port}`);
  });
}
