// This file defines your GraphQL schema using Schema Definition Language (SDL).
// The schema describes the types of data you can query or mutate, and their relationships.
// Comments below explain each part in detail.

export const typeDefs = `#graphql

    # The Author type represents an author entity.
    # Fields:
    # - id: Unique identifier for the author (ID! means non-nullable).
    # - name: Name of the author (String! means non-nullable).
    # - books: List of Book objects written by the author.
    type Author {
        id: ID!
        name: String!
        books: [Book]
    }

    # The Book type represents a book entity.
    # Fields:
    # - id: Unique identifier for the book.
    # - title: Title of the book.
    # - publishedYear: Year the book was published (Int means integer, nullable).
    # - author: The Author object who wrote the book.
    type Book {
        id: ID!
        title: String!
        publishedYear: Int
        author: Author
    }

    # The Query type defines the entry points for reading data.
    # You can fetch all authors or all books.
    type Query {
        authors: [Author] # Returns a list of all authors.
        books: [Book]     # Returns a list of all books.
    }

    # The Mutation type defines entry points for modifying data.
    # Here, you can add a new book.
    # - addBook: Accepts title, publishedYear, and authorId as arguments, returns the newly created Book.
    type Mutation {
        addBook(title: String!, publishedYear: Int, authorId: ID! ): Book!
    }
`;
