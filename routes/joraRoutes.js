const express = require('express');
const router = express.Router();

module.exports = function (joraRepository) {

    router.route('/')
        .post(create)
        .get(list);

    router.route('/:id')
        .delete(deleteTask)

    function create(req, res) {
        console.log("joraRoutes, create");
        const result =  joraRepository.create(req.body.taskName);
        res.json(result);
    }

    async function list(req, res) {
        const list = await joraRepository.list();
        res.json(list);
    }

    async function deleteTask(req, res){
        await joraRepository.remove(req.params.id);
        res.sendStatus(204).end();
    }

    return router;
};