import { gql } from '@apollo/client';

export const LOGIN_MANAGER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      manager {
        id
        name
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      token
      manager {
        id
        name
      }
    }
  }
`;