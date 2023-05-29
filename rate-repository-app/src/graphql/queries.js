import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          stargazersCount
          reviewCount
          ratingAverage
          ownerName
          ownerAvatarUrl
          name
          createdAt
          id
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;