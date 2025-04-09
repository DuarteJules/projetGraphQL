import { User, Article, Comment, Like } from "@prisma/client";

export type UpdateArticleModel = {
  image?: string;
  content?: string;
};

export type UserModel = User;
export type ArticleModel = Article;
export type CommentModel = Comment;
export type LikeModel = Like;
