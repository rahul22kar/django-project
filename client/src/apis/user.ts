import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($mobileNumber: BigInt!) {
    user(mobileNumber: $mobileNumber) {
      id
      name
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($mobileNumber: BigInt!, $name: String!) {
    createUser(userData: { mobileNumber: $mobileNumber, name: $name }) {
      user {
        id
        name
      }
    }
  }
`;
