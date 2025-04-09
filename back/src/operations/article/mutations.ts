import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types";
import { UpdateArticleModel } from "../../models";

type ArticleMutation = WithRequired<
  MutationResolvers,
  "createArticle" | "deleteArticle" | "updateArticle"
>;

export const articleMutations: ArticleMutation = {
  createArticle: async (
    _,
    { image, content },
    { user, dataSources: { db } }
  ) => {
    if (!user) {
      return {
        code: 403,
        success: false,
        message: "Unauthorized",
      };
    }

    try {
      const createdArticle = await db.article.create({
        data: {
          image,
          content,
          userId: user!.id,
        },
      });

      return {
        code: 201,
        success: true,
        message: `the article has been created`,
        article: createdArticle,
      };
    } catch {
      return {
        code: 400,
        message: "The article has not been created",
        success: false,
        article: null,
      };
    }
  },

  deleteArticle: async (_, { id }, { user, dataSources: { db } }) => {
    if (!user) {
      return {
        code: 403,
        success: false,
        message: "Unauthorized",
      };
    }

    try {
      const deletedArticle = await db.article.delete({
        where: {
          id: id,
          userId: user!.id,
        },
      });

      return {
        code: 200,
        success: true,
        message: `the article has been deleted`,
        article: {
          id: deletedArticle.id,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        code: 400,
        message: "The article has not been deleted",
        success: false,
        article: null,
      };
    }
  },

  updateArticle: async (
    _,
    { id, image, content },
    { user, dataSources: { db } }
  ) => {
    if (!user) {
      return {
        code: 403,
        success: false,
        message: "Unauthorized",
      };
    }

    try {
      let data: UpdateArticleModel = {};
      if (image) data.image = image;
      if (content) data.content = content;

      const updatedArticle = await db.article.update({
        where: {
          id: id,
          userId: user!.id,
        },
        data: data,
      });

      return {
        code: 200,
        success: true,
        message: `the article has been updated`,
        article: updatedArticle,
      };
    } catch (e) {
      console.log(e);
      return {
        code: 400,
        message: "The article has not been updated",
        success: false,
        article: null,
      };
    }
  },
};
