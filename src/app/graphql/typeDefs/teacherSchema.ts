import {gql} from '@apollo/client'

export const teacherTypeDefs = gql`
  type Teacher {
    id: Int!
    department: String
  }

  type Query{
    _empty: String
  }

  enum department {
    BSIS
    BSAIS
    BSA
    BSTM
    BSCRIM
    TECHVOC
  }
`