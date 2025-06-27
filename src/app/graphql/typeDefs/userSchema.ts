import { gql } from "@apollo/client";

export const userTypeDefs = gql`
  type User {
    id: ID!
    firstname: String!       
    middlename: String!       
    lastname: String!         
    suffix: String!         
    dob: String!            
    address: String!
    contact_number: String!   
    email: String!      
    password: String!        
    role: Role!      
    created_at: String!
    Student: Student
  }


  enum Role {
    admin
    registrar
    teacher
    student
  }

  type Query {
    _query: String
  }
`
