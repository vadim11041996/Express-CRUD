let locUndeSePastreazaTodourile = [];

const express = require('express');
const router = express.Router();
const levelup = require('levelup');
const leveldown = require('leveldown');

const db = levelup(leveldown('./mydb'));

db.put('name', 'levelup', function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error

    // 3) Fetch by key
    db.get('name', function (err, value) {
        if (err) return console.log('Ooops!', err) // likely the key was not found

        // Ta da!
        console.log('name=' + value)
    })
});

const todoRepository = require('../repository/todo.repository')(locUndeSePastreazaTodourile);
router.route('/')
    .post(create)
    .get(list);

router.route('/:id')
    .delete(deleteTask);

async function create(req, res) {
    const result =  await todoRepository.create(req.body);
    res.json(result);
}

async function list(req, res) {
    const list = await todoRepository.list();
    console.log(list);
    res.json(list);
}
async function deleteTask(req, res){
    console.log(req.params);
    await todoRepository.remove(req.params.id);
    res.sendStatus(204).end();
}

module.exports = router;

