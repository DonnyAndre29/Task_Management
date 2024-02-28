const express = require('express');
// const Task = require("../models/task");
// const auth = require("../middleware/auth");
const router = express.Router();

const {
    getAllTasks,
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask
} = require('../controller/task-routes')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTasks).patch(updateTaskStatus).delete(deleteTask)

module.exports = router;