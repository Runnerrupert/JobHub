import { gql } from '@apollo/client';

export const LOGIN_MANAGER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      manager {
        _id
        username
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      manager {
        email
        username
      }
    }
  }
`;