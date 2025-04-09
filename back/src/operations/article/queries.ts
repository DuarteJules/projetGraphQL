import { WithRequired } from "../../utils/mapped-types";
import { QueryResolvers } from "../../types";
import { Article } from "@prisma/client";

type ArticleQueries = WithRequired<QueryResolvers, "getArticles">;

export const articleQueries: ArticleQueries = {
  getArticles: async (_, __, { dataSources: { db } }) => {
    const articles: Article[] = await db.article.findMany();
    return articles;
  },
};
