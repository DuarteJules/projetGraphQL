import { commentMutations } from "./operations/comment/mutations.js";
import { CommentResolver } from "./operations/comment/models.js";
import { likeMutations } from "./operations/like/mutations.js";
import { userQueries } from "./operations/user/queries.js";
import { userMutations } from "./operations/user/mutations.js";
import { articleMutations } from "./operations/article/mutations.js";
import { Resolvers } from "./types.js";
import { commentQueries } from "./operations/comment/queries.js";
import { articleQueries } from "./operations/article/queries.js";
import { ArticleResolver } from "./operations/article/models.js";

export const resolvers: Resolvers = {
  Query: {
    ...articleQueries,
    ...commentQueries,
    ...userQueries,
  },
  Mutation: {
    ...userMutations,
    ...articleMutations,
    ...commentMutations,
    ...likeMutations,
  },
  Article: ArticleResolver,
  Comment: CommentResolver,
};
