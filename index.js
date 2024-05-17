const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const checkForAuthCookie = require("./middlewares/auth");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then((e) => console.log(`mongodb connected`));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
//we'll need this user for showing login/logout in navbar
app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});
app.use("/user", userRoute);
app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));
