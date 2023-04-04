const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/third", {
  useNewUrlParser: true,
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

app.listen(5000, () => {
  console.log("listening to port 5000");
});
