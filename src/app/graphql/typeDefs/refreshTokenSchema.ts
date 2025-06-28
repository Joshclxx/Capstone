import {gql} from "@apollo/client"

export const refreshTokenDefs = gql`
  type AccessToken {
    accessToken: String
  }

  type Mutation {
    refreshToken: AccessToken!
  }

`