import { gql } from "@apollo/client";

export const loginTypeDefs = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  type LoginOperationResponse {
    success: Boolean!
    message: String!
    token: String
  }

  type Mutation {
    login(data: LoginInput!): LoginOperationResponse!
  }
`;
