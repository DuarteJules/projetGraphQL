import {WithRequired} from "../../utils/mapped-types";
import {QueryResolvers} from "../../types";

type UserQueries = WithRequired<QueryResolvers, 'getMe'>


export const userQueries: UserQueries = {
  getMe: async (_, __, {user, dataSources: {db}}) => {
    if (!user) {
      return {
        code: 403,
        success: false,
        message: "Unauthorized",
        user: null
      }
    }

    const currentUser = await db.user.findUnique({
      where: {
        id: user!.id
      }
    })

    return {
      code: 200,
      success: true,
      message: "User fetched successfully",
      user: currentUser,
    }
  }
}
