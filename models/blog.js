const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImgUrl: {
      type: String,
      // default: "/images/default.jpeg",->not ./public/... as we're using middleare in index.js to serve static files in public folder
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", //model name
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
