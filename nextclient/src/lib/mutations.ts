import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const SYNC_GOOGLE_MUTATION = gql`
  mutation SyncGoogleUser($email: String!, $name: String!, $googleId: String!) {
    syncGoogleUser(email: $email, name: $name, googleId: $googleId) {
      id
    }
  }
`;