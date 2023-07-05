const sql = require('../../libraries/database/user.connet');

const modelPost = (data, res) => {
  const query = `insert into taskKeeper(content, dueDate, status, userName) values(?,?,?,?)`;
  const dataValues = [data.content, data.dueDate, Number(data.status), data.userName];
  sql.query(query, dataValues, (err, result) => {
    if (err) {
      return res.status(200).json({ message: 'Error inserting' }, err);
    }
    res.status(200).json({ message: 'insert successfully' });
  });
};

const modelGet = (req, res) => {
  const query = `select * from taskKeeper`;
  sql.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting Task' });
    }
    res.status(200).json(result);
  });
};

const modelPatch = (id, data, res) => {
  const query = `update taskKeeper set ? where id = ?`;
  sql.query(query, [data, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error Update ' });
    }
    res.status(200).json({ message: 'Update successfully' });
  });
};

const modelDelete = (id, res) => {
  const query = `delete from taskKeeper where id = ?`;
  sql.query(query, id, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error delete task' }, err);
    }
    res.status(200).json({ message: 'delete successfully' });
  });
};
module.exports = { modelPost, modelGet, modelPatch, modelDelete };
