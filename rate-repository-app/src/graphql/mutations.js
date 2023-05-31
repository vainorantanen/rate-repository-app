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

/*
mutation {
  createReview(review: {rating: 10, repositoryName: "swr", ownerName: "zeit", text: "jargonia"}) {
    rating
    repository {
      name
      ownerName
    }
    text
  }
}

*/
