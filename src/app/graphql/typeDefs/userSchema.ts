import { gql } from "@apollo/client";

export const userTypeDefs = gql`
  type User {
    id: ID!
    firstname: String!       
    middlename: String!       
    lastname: String!         
    suffix: String!         
    dob: DateTime!            
    address: String!
    contact_number: String!   
    email: String!      
    password: String!        
    role: Role!      
    created_at: DateTime!
    Admin: #Empty
    Student: #Empty   
    Teacher: #Empty for now
  }

  enum Role {
    admin
    registrar
    teacher
    student
  }
`
