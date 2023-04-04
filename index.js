const express = require("express");

require("./db/mongoose");

const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(3000, () => {
  console.log("listening to port");
});
const Task = require("./db/models/tasks");
const User = require("./db/models/user");
const main = async () => {
  const user = await User.findById("642c7a7d36e1846061db6701");
  await user.populate("tasks");
  console.log(user.tasks);
};
main();
