const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 5000;

async function startServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () =>
    console.log(`Server on http://localhost:${PORT}/graphql 🚀`)
  );
}

startServer();
