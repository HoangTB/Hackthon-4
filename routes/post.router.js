const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");

const postPath = path.join(__dirname, "../data/posts.json");
route
  .route("/")
  .get((req, res) => {
    fs.readFile(postPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const postParser = JSON.parse(data);
      res.status(200).json(postParser);
    });
  })
  .post((req, res) => {
    fs.readFile(postPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const postParser = JSON.parse(data);
      const newPost = {
        id: postParser[postParser.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body,
      };
      postParser.push(newPost);
      fs.writeFile(postPath, JSON.stringify(postParser), (err) => {
        if (err) {
          return res.status(500).json({ message: "Error Writing" });
        }
      });
      res.status(200).json({ message: "Successful" });
    });
  });

route
  .route("/:id")
  .get((req, res) => {
    fs.readFile(postPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const postParser = JSON.parse(data);
      const userFind = postParser.find(
        (user) => user.id == Number(req.params.id)
      );
      res.status(200).json(userFind);
    });
  })
  .put((req, res) => {
    fs.readFile(postPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const postParser = JSON.parse(data);
      const userFindIndex = postParser.findIndex(
        (user) => user.id == Number(req.params.id)
      );
      console.log(userFindIndex);
      if (userFindIndex !== -1) {
        postParser[userFindIndex] = {
          ...postParser[userFindIndex],
          ...req.body,
        };
        fs.writeFile(postPath, JSON.stringify(postParser), (err) => {
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
    fs.readFile(postPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading" });
      }
      const postParser = JSON.parse(data);
      const UserFilter = postParser.filter(
        (user) => user.id !== Number(req.params.id)
      );
      const checkId = postParser.find(
        (user) => user.id == Number(req.params.id)
      );
      if (checkId) {
        fs.writeFile(postPath, JSON.stringify(UserFilter), (err) => {
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
