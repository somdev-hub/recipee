/**
 * @module server
 * @filename server.js
 * @namespace Server
 * @fileoverview Server entry point
 * @description This file defines the server entry point
 */

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./src/resolvers.js";
import { typeDefs } from "./src/schema.js";
import { database } from "./src/datasources/database.js";
import dotenv from "dotenv";

dotenv.config();

database();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
