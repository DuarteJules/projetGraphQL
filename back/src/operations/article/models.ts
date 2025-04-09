import { Resolvers } from "../../types.js";

export const ArticleResolver: Resolvers["Article"] = {
  comments: ({ id }, _, { dataSources: { db } }) =>
    db.comment.findMany({
      where: {
        articleId: id,
      },
    }),
  likes: ({ id }, _, { dataSources: { db } }) =>
    db.like.findMany({
      where: {
        articleId: id,
      },
    }),
  user: ({ userId }, _, { dataSources: { db } }) => {
    return db.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};
