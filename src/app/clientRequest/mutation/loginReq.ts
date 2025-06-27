import {gql} from "@apollo/client"

export const LOGIN = gql`
  mutation login ($data: LoginInput!){
    login(data: $data){
        success
        message
        token
    }
  }
`
