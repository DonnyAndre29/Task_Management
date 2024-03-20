const express = require('express');
const router = express.Router();

const {
    getAllTasks,
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask

} = require('./task-routes')


router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTasks).patch(updateTaskStatus).delete(deleteTask)

module.exports = router;