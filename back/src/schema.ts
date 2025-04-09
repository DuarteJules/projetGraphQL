import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getArticles: [Article]
    getInfosArticle: [Article]
    getCommentsByArticle(articleId: ID!): [Comment]
    getMe: GetMeUserResponse!
  }

  type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse!
    signIn(username: String!, password: String!): SignInResponse!
    createArticle(image: String!, content: String!): CreateArticleResponse!
    deleteArticle(id: ID!): DeleteArticleResponse!
    updateArticle(
      id: ID!
      image: String
      content: String
    ): UpdateArticleResponse!
    createComment(articleId: ID!, content: String!): CreateCommentResponse!
    deleteComment(id: ID!): DeleteCommentResponse!
    updateComment(id: ID!, content: String!): UpdateCommentResponse!
    manageLike(articleId: ID!): ManageLikeResponse!
  }

  type GetMeUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type SignInResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  type CreateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }

  type DeleteArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type UpdateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }

  type CreateCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type DeleteCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type UpdateCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type ManageLikeResponse {
    code: Int!
    success: Boolean!
    message: String!
    like: Like
  }

  type User {
    id: ID!
    username: String!
    articles: [Article]
    comments: [Comment]
    likes: [Like]
  }

  type Article {
    id: ID!
    image: String!
    content: String!
    comments: [Comment]
    likes: [Like]
    user: User
  }

  type Comment {
    id: ID!
    content: String!
    user: User
    article: Article
  }

  type Like {
    id: ID!
    article: Article
    user: User
  }
`;
