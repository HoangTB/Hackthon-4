const express = require("express");
const router = express.Router();
const path = require("path");

// const userPath = path.join(__dirname, "../data/users.json");
const postPath = path.join(__dirname, "../data/posts.json");

router.get("/:id/post", (req, res) => {
  fs.readFile(postPath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading" });
    }
    const PostParser = JSON.parse(data);
    const UserPosts = PostParser.filter(
      (post) => post.userId == Number(req.params.id)
    );

    res.status(200).json(UserPosts);
  });
});

module.exports = router;
