/**
 * @module src/datasources/models/posts
 * @filename posts.js
 * @namespace Posts
 * @fileoverview Posts model
 * @description This file defines the posts model
 */

import mongoose from "mongoose";

export const Posts = mongoose.model("Posts", {
  title: String,
  image: String,
  description: String,
  date: String,
  tags: [String],
  likes: Number,
  comments: [
    {
      user: String,
      userMail: String,
      comment: String
    }
  ],
  author: String,
  authorMail: String,
  length: String
});
