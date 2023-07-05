const express = require('express');
const route = express.Router();
const controllerTask = require('../controllers/user.controller');
route.route('/').post(controllerTask.postTask).get(controllerTask.getTask);

route.route('/:id').delete(controllerTask.deleteTask).patch(controllerTask.updateTask);

module.exports = route;
