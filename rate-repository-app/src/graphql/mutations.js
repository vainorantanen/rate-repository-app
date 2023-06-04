import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation authenticate($credentials: AuthenticateInput!) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`;

export const CREATE_REVIEW = gql`
mutation createReview($review: CreateReviewInput) {
  createReview(review: $review) {
    rating
    repository {
      name
      ownerName
    }
    text
    repositoryId
  }
}
`;

export const SIGN_UP = gql`
mutation createUser($user: CreateUserInput) {
  createUser(user: $user) {
    id
    username
  }
}
`;


export const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;