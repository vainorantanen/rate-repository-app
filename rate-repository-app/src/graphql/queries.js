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
query repository($id: ID!) {
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
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const ORDERED_REPOS = gql`
query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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