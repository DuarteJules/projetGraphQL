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
const typeDefs = gql `
  # ...
  type Query {
    doctors: [Doctor]
  }
  # ...
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
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
