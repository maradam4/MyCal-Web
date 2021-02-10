import { gql } from "@apollo/client";

export const LoginQL = gql`
  mutation loginToChannel($password: String!) {
    loginToChannel(password: $password) {
      accessToken
      errors
    }
  }
`;
