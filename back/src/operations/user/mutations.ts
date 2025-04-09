import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types";
import {
  hashPassword,
  comparePassword,
  createJWT,
} from "../../modules/auth.js";

type UserMutations = WithRequired<MutationResolvers, "createUser" | "signIn">;

export const userMutations: UserMutations = {
  createUser: async (_, { username, password }, { dataSources: { db } }) => {
    try {
      const createdUser = await db.user.create({
        data: {
          username,
          password: await hashPassword(password),
        },
      });

      return {
        code: 201,
        success: true,
        message: `user ${username} has been created`,
        user: createdUser,
      };
    } catch {
      return {
        code: 400,
        message: "User has not been created",
        success: false,
        user: null,
      };
    }
  },
  signIn: async (_, { username, password }, { dataSources: { db } }, __) => {
    try {
      const user = await db.user.findFirstOrThrow({
        where: { username },
      });
      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const jwtToken = createJWT(user);

      return {
        code: 200,
        message: "User connected",
        success: true,
        token: jwtToken,
        user: user,
      };
    } catch (e) {
      return {
        code: 401,
        message: (e as Error).message,
        success: false,
        token: null,
        user: null,
      };
    }
  },
};
