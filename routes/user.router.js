const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");

const userPath = path.join(__dirname, "../data/users.json");
route
  .route("/")
  .get((req, res) => {
    fs.readFile(userPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const userParser = JSON.parse(data);
      res.status(200).json(userParser);
    });
  })
  .post((req, res) => {
    fs.readFile(userPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const userParser = JSON.parse(data);
      const idFind = userParser.find((user) => user.id == req.body.id);
      if (idFind) {
        res.status(200).json({ message: "ID already exists" });
      } else {
        userParser.push(req.body);
        fs.writeFile(userPath, JSON.stringify(userParser), (err) => {
          if (err) {
            return res.status(500).json({ message: "Error Writing" });
          }
        });
        res.status(200).json({ message: "Successful" });
      }
    });
  });

route
  .route("/:id")
  .get((req, res) => {
    fs.readFile(userPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const UserParser = JSON.parse(data);
      const userFind = UserParser.find(
        (user) => user.id == Number(req.params.id)
      );
      res.status(200).json(userFind);
    });
  })
  .put((req, res) => {
    fs.readFile(userPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const userParser = JSON.parse(data);
      const userFindIndex = userParser.findIndex(
        (user) => user.id == Number(req.params.id)
      );
      console.log(userFindIndex);
      if (userFindIndex !== -1) {
        userParser[userFindIndex] = {
          ...userParser[userFindIndex],
          ...req.body,
        };
        fs.writeFile(userPath, JSON.stringify(userParser), (err) => {
          if (err) {
            return res.status(500).json({ message: "Error" });
          }
        });
        res.status(200).json({ message: "Updated Successful" });
      } else {
        res.status(200).json({ message: "ID Not Found" });
      }
    });
  })
  .delete((req, res) => {
    fs.readFile(userPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const UserParser = JSON.parse(data);
      const UserFilter = UserParser.filter(
        (user) => user.id !== Number(req.params.id)
      );
      console.log(UserFilter);
      const checkId = UserParser.find(
        (user) => user.id == Number(req.params.id)
      );
      if (checkId) {
        fs.writeFile(userPath, JSON.stringify(UserFilter), (err) => {
          if (err) {
            return res.status(500).json({ message: "Error writing file" });
          }
        });
        res.status(200).json({ message: "Delete successfully" });
      } else {
        res.status(200).json({ message: "ID not found" });
      }
    });
  });

module.exports = route;
