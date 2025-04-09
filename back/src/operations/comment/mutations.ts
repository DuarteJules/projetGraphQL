import { WithRequired } from "../../utils/mapped-types";
import { MutationResolvers } from "../../types";

type CommentMutation = WithRequired<
  MutationResolvers,
  "createComment" | "deleteComment" | "updateComment"
>;

export const commentMutations: MutationResolvers = {
  createComment: async (
    _,
    { articleId, content },
    { user, dataSources: { db } }
  ) => {
    if (!user) {
      return {
        code: 403,
        success: false,
        message: "Unauthorized",
      };
    }

    const article = await db.article.findUnique({
      where: {
        id: articleId,
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

    try {
      const createdComment = await db.comment.create({
        data: {
          content,
          articleId,
          userId: user!.id,
        },
      });

      return {
        code: 201,
        message: "comment created successfully",
        success: true,
        comment: createdComment,
      };
    } catch {
      return {
        code: 400,
        message: "comment has not been created",
        success: false,
        comment: null,
      };
    }
  },

  deleteComment: async (_, { id }, { user, dataSources: { db } }) => {
    if (!user) {
      return {
        code: 403,
        success: false,
        message: "Unauthorized",
      };
    }

    try {
      const deletedComment = await db.comment.delete({
        where: {
          id: id,
          userId: user!.id,
        },
      });

      return {
        code: 200,
        success: true,
        message: `the comment has been deleted`,
        comment: {
          id: deletedComment.id,
        },
      };
    } catch {
      return {
        code: 400,
        success: false,
        message: "The comment has not been deleted",
        comment: null,
      };
    }
  },

  updateComment: async (_, { id, content }, { user, dataSources: { db } }) => {
    if (!user) {
      return {
        code: 403,
        success: false,
        message: "Unauthorized",
      };
    }

    try {
      const updatedComment = await db.comment.update({
        where: {
          id: id,
          userId: user!.id,
        },
        data: { content },
      });

      return {
        code: 200,
        success: true,
        message: `the comment has been updated`,
        comment: updatedComment,
      };
    } catch {
      return {
        code: 400,
        message: "The comment has not been updated",
        success: false,
        article: null,
      };
    }
  },
};
