const express = require('express');
// const Task = require("../models/task");
// const auth = require("../middleware/auth");
const router = express.Router();

const {
    getAllTasks,
    createTask, 
    getTask, 
    updateTask, 
    deleteTask
} = require('../controller/task-routes').default

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router;