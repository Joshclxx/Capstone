import { gql } from "@apollo/client";

export const studentTypeDefs = gql`
  type Student {
    id: Int!
    section: String
    subject: String
    year: Int
    created_at: String!
    emergency_contact: String!
    userId: ID!
    User: User!
  }

  type Query{
    getStudents: StudentOperationResponse!
  }

  type StudentOperationResponse {
    success: Boolean!
    message: String!
    data: [Student!]
  }



`