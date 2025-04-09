import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  comments?: Maybe<Array<Maybe<Comment>>>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  likes?: Maybe<Array<Maybe<Like>>>;
  user?: Maybe<User>;
};

export type Comment = {
  __typename?: 'Comment';
  article?: Maybe<Article>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type CreateArticleResponse = {
  __typename?: 'CreateArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateCommentResponse = {
  __typename?: 'CreateCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type DeleteArticleResponse = {
  __typename?: 'DeleteArticleResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteCommentResponse = {
  __typename?: 'DeleteCommentResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GetMeUserResponse = {
  __typename?: 'GetMeUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Like = {
  __typename?: 'Like';
  article?: Maybe<Article>;
  id: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type ManageLikeResponse = {
  __typename?: 'ManageLikeResponse';
  code: Scalars['Int']['output'];
  like?: Maybe<Like>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: CreateArticleResponse;
  createComment: CreateCommentResponse;
  createUser: CreateUserResponse;
  deleteArticle: DeleteArticleResponse;
  deleteComment: DeleteCommentResponse;
  manageLike: ManageLikeResponse;
  signIn: SignInResponse;
  updateArticle: UpdateArticleResponse;
  updateComment: UpdateCommentResponse;
};


export type MutationCreateArticleArgs = {
  content: Scalars['String']['input'];
  image: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationManageLikeArgs = {
  articleId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCommentArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getArticles?: Maybe<Array<Maybe<Article>>>;
  getCommentsByArticle?: Maybe<Array<Maybe<Comment>>>;
  getInfosArticle?: Maybe<Array<Maybe<Article>>>;
  getMe: GetMeUserResponse;
};


export type QueryGetCommentsByArticleArgs = {
  articleId: Scalars['ID']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UpdateArticleResponse = {
  __typename?: 'UpdateArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdateCommentResponse = {
  __typename?: 'UpdateCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  articles?: Maybe<Array<Maybe<Article>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  id: Scalars['ID']['output'];
  likes?: Maybe<Array<Maybe<Like>>>;
  username: Scalars['String']['output'];
};

export type CreateArticleMutationVariables = Exact<{
  image: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'CreateArticleResponse', code: number, success: boolean, message: string, article?: { __typename?: 'Article', id: string, image: string, content: string } | null } };

export type UpdateArticleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'UpdateArticleResponse', code: number, success: boolean, message: string, article?: { __typename?: 'Article', id: string, image: string, content: string } | null } };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: { __typename?: 'DeleteArticleResponse', code: number, success: boolean, message: string } };

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = { __typename?: 'Query', getArticles?: Array<{ __typename?: 'Article', id: string, image: string, content: string, user?: { __typename?: 'User', id: string, username: string } | null, likes?: Array<{ __typename?: 'Like', id: string } | null> | null } | null> | null };

export type GetCommentsByArticleQueryVariables = Exact<{
  articleId: Scalars['ID']['input'];
}>;


export type GetCommentsByArticleQuery = { __typename?: 'Query', getCommentsByArticle?: Array<{ __typename?: 'Comment', id: string, content: string, user?: { __typename?: 'User', username: string } | null, article?: { __typename?: 'Article', image: string, content: string } | null } | null> | null };

export type CreateCommentMutationVariables = Exact<{
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentResponse', code: number, success: boolean, message: string, comment?: { __typename?: 'Comment', id: string } | null } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['ID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'DeleteCommentResponse', code: number, success: boolean, message: string } };

export type UpdateCommentMutationVariables = Exact<{
  updateCommentId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'UpdateCommentResponse', code: number, success: boolean, message: string } };

export type ManageLikeMutationVariables = Exact<{
  articleId: Scalars['ID']['input'];
}>;


export type ManageLikeMutation = { __typename?: 'Mutation', manageLike: { __typename?: 'ManageLikeResponse', code: number, success: boolean, message: string } };

export type SignInMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInResponse', code: number, success: boolean, message: string, token?: string | null, user?: { __typename?: 'User', id: string, username: string } | null } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserResponse', code: number, success: boolean, message: string, user?: { __typename?: 'User', id: string, username: string } | null } };


export const CreateArticleDocument = gql`
    mutation CreateArticle($image: String!, $content: String!) {
  createArticle(image: $image, content: $content) {
    code
    success
    message
    article {
      id
      image
      content
    }
  }
}
    `;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      image: // value for 'image'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($id: ID!, $image: String, $content: String) {
  updateArticle(id: $id, image: $image, content: $content) {
    code
    success
    message
    article {
      id
      image
      content
    }
  }
}
    `;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      image: // value for 'image'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: ID!) {
  deleteArticle(id: $id) {
    code
    success
    message
  }
}
    `;
export type DeleteArticleMutationFn = Apollo.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, options);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const GetArticlesDocument = gql`
    query GetArticles {
  getArticles {
    id
    image
    content
    user {
      id
      username
    }
    likes {
      id
    }
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
      }
export function useGetArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
        }
export function useGetArticlesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesSuspenseQueryHookResult = ReturnType<typeof useGetArticlesSuspenseQuery>;
export type GetArticlesQueryResult = Apollo.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;
export const GetCommentsByArticleDocument = gql`
    query GetCommentsByArticle($articleId: ID!) {
  getCommentsByArticle(articleId: $articleId) {
    id
    content
    user {
      username
    }
    article {
      image
      content
    }
  }
}
    `;

/**
 * __useGetCommentsByArticleQuery__
 *
 * To run a query within a React component, call `useGetCommentsByArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsByArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsByArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useGetCommentsByArticleQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsByArticleQuery, GetCommentsByArticleQueryVariables> & ({ variables: GetCommentsByArticleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsByArticleQuery, GetCommentsByArticleQueryVariables>(GetCommentsByArticleDocument, options);
      }
export function useGetCommentsByArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsByArticleQuery, GetCommentsByArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsByArticleQuery, GetCommentsByArticleQueryVariables>(GetCommentsByArticleDocument, options);
        }
export function useGetCommentsByArticleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommentsByArticleQuery, GetCommentsByArticleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommentsByArticleQuery, GetCommentsByArticleQueryVariables>(GetCommentsByArticleDocument, options);
        }
export type GetCommentsByArticleQueryHookResult = ReturnType<typeof useGetCommentsByArticleQuery>;
export type GetCommentsByArticleLazyQueryHookResult = ReturnType<typeof useGetCommentsByArticleLazyQuery>;
export type GetCommentsByArticleSuspenseQueryHookResult = ReturnType<typeof useGetCommentsByArticleSuspenseQuery>;
export type GetCommentsByArticleQueryResult = Apollo.QueryResult<GetCommentsByArticleQuery, GetCommentsByArticleQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($articleId: ID!, $content: String!) {
  createComment(articleId: $articleId, content: $content) {
    code
    success
    message
    comment {
      id
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: ID!) {
  deleteComment(id: $deleteCommentId) {
    code
    success
    message
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      deleteCommentId: // value for 'deleteCommentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($updateCommentId: ID!, $content: String!) {
  updateComment(id: $updateCommentId, content: $content) {
    code
    success
    message
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      updateCommentId: // value for 'updateCommentId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const ManageLikeDocument = gql`
    mutation ManageLike($articleId: ID!) {
  manageLike(articleId: $articleId) {
    code
    success
    message
  }
}
    `;
export type ManageLikeMutationFn = Apollo.MutationFunction<ManageLikeMutation, ManageLikeMutationVariables>;

/**
 * __useManageLikeMutation__
 *
 * To run a mutation, you first call `useManageLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useManageLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [manageLikeMutation, { data, loading, error }] = useManageLikeMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useManageLikeMutation(baseOptions?: Apollo.MutationHookOptions<ManageLikeMutation, ManageLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ManageLikeMutation, ManageLikeMutationVariables>(ManageLikeDocument, options);
      }
export type ManageLikeMutationHookResult = ReturnType<typeof useManageLikeMutation>;
export type ManageLikeMutationResult = Apollo.MutationResult<ManageLikeMutation>;
export type ManageLikeMutationOptions = Apollo.BaseMutationOptions<ManageLikeMutation, ManageLikeMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    code
    success
    message
    token
    user {
      id
      username
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    code
    success
    message
    user {
      id
      username
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;