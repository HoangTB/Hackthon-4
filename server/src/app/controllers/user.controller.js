const modelTask = require('../models/user.model');

const postTask = (req, res) => {
  const data = req.body;
  modelTask.modelPost(data, res);
};

const getTask = (req, res) => {
  modelTask.modelGet(req, res);
};

const updateTask = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  modelTask.modelPatch(id, data, res);
};

const deleteTask = (req, res) => {
  const id = req.params.id;
  modelTask.modelDelete(id, res);
};
module.exports = { postTask, updateTask, deleteTask, getTask };
