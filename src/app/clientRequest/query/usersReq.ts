import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  query users{
    getAllUsers{
        success
        message
        data {
           firstname
           middlename
           lastname
        }
    }
  }
`