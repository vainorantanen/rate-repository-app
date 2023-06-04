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

export const SINGLE_REPO = gql`
query Query($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    id
    fullName
    url
    ownerAvatarUrl
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    reviews(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          rating
          createdAt
          text
          user {
            id
            username
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
}
`;

export const ORDERED_REPOS = gql`
query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
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

export const USER_REVIEWS = gql`
query Query {
  me {
    id
    username
    reviews {
      edges {
        node {
          id
          text
          createdAt
          rating
          user {
            id
            username
          }
          repositoryId
        }
      }
    }
  }
}
`;