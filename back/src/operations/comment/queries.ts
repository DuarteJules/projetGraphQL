import {WithRequired} from "../../utils/mapped-types";
import {QueryResolvers} from "../../types";
import { Comment } from "@prisma/client"

type CommentQueries = WithRequired<QueryResolvers, 'getCommentsByArticle'>


export const commentQueries: CommentQueries = {
    getCommentsByArticle: async (_, {articleId}, {dataSources: {db}}) => {
        const comments: Comment[] = await db.comment.findMany({
            where: {
                articleId: articleId
            }
        });
        return comments
    }
}
