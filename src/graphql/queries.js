import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    getPosts {
      id
      channel
      status
      lat
      long
      poster
      dte
    }
  }
`;
