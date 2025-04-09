import { WithRequired } from "../../utils/mapped-types";
import { MutationResolvers } from "../../types";

type LikeMutation = WithRequired<MutationResolvers, "manageLike">;

export const likeMutations: MutationResolvers = {
  manageLike: async (_, { articleId }, { user, dataSources: { db } }) => {
    if (!user) {
      return {
        code: 403,
        success: false,
        message: "Unauthorized",
      };
    }

    const article = await db.article.findFirst({
      where: {
        id: articleId,
        userId: user!.id,
      },
    });

    if (!article) {
      return {
        code: 400,
        success: false,
        message: "the article does not exist",
        comment: null,
      };
    }

    const alreadyLiked = await db.like.findFirst({
      where: {
        articleId,
        userId: user!.id,
      },
    });

    if (alreadyLiked) {
      try {
        const createdLike = await db.like.delete({
          where: {
            id: alreadyLiked.id,
            userId: user!.id,
          },
        });

        return {
          code: 201,
          message: "like removed successfully",
          success: true,
          like: createdLike,
        };
      } catch {
        return {
          code: 400,
          message: "like has not been removed",
          success: false,
          comment: null,
        };
      }
    }

    try {
      const createdLike = await db.like.create({
        data: {
          articleId,
          userId: user!.id,
        },
      });

      return {
        code: 201,
        message: "like added successfully",
        success: true,
        like: createdLike,
      };
    } catch {
      return {
        code: 400,
        message: "like has not been added",
        success: false,
        comment: null,
      };
    }
  },
};
