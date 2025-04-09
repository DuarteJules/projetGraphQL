import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";

const doctorsData = [
  {
    name: "Samia Mekame",
    speciality: "OPHTALMOLOGIST",
  },
  {
    name: "Catherine Bedoy",
    speciality: "PSYCHOLOGIST",
  },
];
const typeDefs = gql`
  type Doctor {
    name: String
    speciality: Speciality
  }

  enum Speciality {
    PSYCHOLOGIST
    OPHTALMOLOGIST
  }
  type Query {
    doctors: [Doctor]
  }
`;

const resolvers = {
  Query: {
    doctors: () => doctorsData,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

import db from "./datasources/db.js";

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    // ...
    return {
      dataSources: {
        db,
      },
      // ...
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
