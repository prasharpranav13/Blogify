require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
app.use(express.static(path.resolve("./public")));
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");
const mongoose = require("mongoose");
const checkForAuthCookie = require("./middlewares/auth");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log(`mongodb connected`));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
//we'll need this user for showing login/logout in navbar
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));
