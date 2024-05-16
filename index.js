const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then((e) => console.log(`mongodb connected`));

app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoute);
app.use("/", (req, res) => {
  res.render("home");
});
app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));
