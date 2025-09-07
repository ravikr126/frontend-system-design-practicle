// ! is for mandatory fields

export const typeDefs = ` #graphql
  type Author {
    id:ID!
    name: String!
  }
    type Book{
        id:ID!
        title:String!
        publishedYear: Int
    }

    // methods for fetching data
    type Query{
        authors:[Author!]! // [] means array, ! means not null ,because we want multiple authors
        books:[Book!]
    }

    // methods for modifying data
    type Mutation{
        addAuthor(name:String!):Author!
        addBook(title:String!, publishedYear:Int, authorId:ID!):Book!
    }   
`;
