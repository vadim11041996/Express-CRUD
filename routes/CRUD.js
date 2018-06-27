const locUndeSePastreazaTodourile = [];

const express = require('express');

const router = express.Router();

const todoRepository = require('../repository/todo.repository')(locUndeSePastreazaTodourile);

router.route('/createtable')
  .get(createTable);

router.route('/')
  .post(create)
  .get(list)
  .get();

router.route('/:id')
  .delete(deleteTask);

router.route('/add')
  .get(async (req, res) => {
    const result = await todoRepository.create(req.query.task);
    res.json(result);
  });

async function createTable(req, res) {
  await todoRepository.createTable();
  res.send('Tasks table created');
}

async function create(req, res) {
  const result = await todoRepository.create(req.body.task);
  res.json(result);
}

async function list(req, res) {
  const result = await todoRepository.list();
  res.json(result);
}

async function deleteTask(req, res) {
  // console.log(req.params);
  await todoRepository.remove(req.params.id);
  res.sendStatus(204).end();
}

module.exports = router;
