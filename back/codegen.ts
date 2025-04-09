import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#Context",
        mappers: {
          Track: "./models#TrackModel",
          Author: "./models#AuthorModel",
          Film: "./models#FilmModel",
          People: "./models#PeopleModel",
          Comment: "./models#CommentModel",
          User: "./models#UserModel",
          Article: "./models#ArticleModel",
        },
      },
    },
  },
};

export default config;
