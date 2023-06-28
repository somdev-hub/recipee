// const { ApolloServer } = require("@apollo/server");
// const { startStandaloneServer } = require("@apollo/server/standalone");
// // const mongoose = require("mongoose");
// const { resolvers } = require("./src/resolvers");
// const typeDefs = require("./src/schema");
// const { database } = require("./src/datasources/database");
// const express = require("express");
// const { graphql } = require("graphql");
// const { graphqlUploadExpress } = require('graphql-upload/public');

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./src/resolvers.js";
import { typeDefs } from "./src/schema.js";
import { database } from "./src/datasources/database.js";
import express from "express";
import { graphql } from "graphql";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import multer from "multer";
import imageUpload from "./rest/index.js";
import dotenv from "dotenv";

dotenv.config();

database();

const multerMiddleware = multer({
  fileFilter: (file, cb) => {
    // Only allow images to be uploaded.
    if (!file.mimetype.match("image.*")) {
      cb(new Error("Only images can be uploaded."));
    } else {
      cb(null, true);
    }
  }
});

const server = new ApolloServer({
  // uploads: true,
  // allowedFileTypes: ["image/jpeg", "image/png"],
  // maxFileSize: 10000000, // 10 MB
  typeDefs,
  resolvers,
  middleware: multerMiddleware
});

// imageUpload();

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
