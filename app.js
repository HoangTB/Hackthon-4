const express = require("express");
const app = express();
const port = 8080;
const userRouter = require("./routes/user.router");
const postRouter = require("./routes/post.router");
const apiRouter = require("./routes/api.router");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/api/v1/users/", apiRouter);

app.get("/", (req, res) => {
  res.status(200).send("This is HomePage");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
