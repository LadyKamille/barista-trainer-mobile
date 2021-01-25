import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation signUp($attributes: UserInput!) {
    signUp(attributes: $attributes) {
      user {
        createdAt
        id
        firstName
        lastName
        name
        token
        updatedAt
        email
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
