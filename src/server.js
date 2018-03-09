var express = require("express");
var env = require("dotenv");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var jwt = require("express-jwt");
var root = require("./root/routers");
root = root.default();
env.config();
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    login: String
  }

`);
// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return "Hello world!";
//   }
// };

var app = express();

const unless_filter = req => {
  return true;
};

app.use(
  jwt({
    secret: process.env.JWT_SECRET
  }).unless(unless_filter)
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
