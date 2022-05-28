import { gql } from "apollo-server-express"




//define the schema
const typeDefs = gql`
type Query{
    users: [User]
    messagesByUser(receiverId:Int!):[Message]

}

type User {
    id : ID!
    firstName : String
    lastName : String
    email: String
 
}
input UserInput{
    firstName:String!
    lastName : String!
    email:String! 
    password:String!
}
input UserSignInInput{
    email:String! 
    password:String!
}
scalar Date

type Message{
    id :ID!
    text :String! 
    receiverId :Int!
    senderId  :Int !
    createdAt :Date
}

type Mutation{
    signupUser(userNew:UserInput!):User
    signinUser(userSignIn: UserSignInInput) : Token
    createMessage(receiverId:Int!,text:String!):Message
   
}

type Token{
    token:String!
}
type Subscription{
    messageAdded: Message
}



`

export default typeDefs
