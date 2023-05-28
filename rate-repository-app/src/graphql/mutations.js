import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation authenticate($credentials: AuthenticateInput!) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`;