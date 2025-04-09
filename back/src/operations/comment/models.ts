import { Resolvers } from "../../types.js";

export const CommentResolver: Resolvers['Comment'] = {
    user: ({userId}, _, {dataSources: {db}}) => db.user.findUnique({
        where: {
            id: userId,
        }
    })
}