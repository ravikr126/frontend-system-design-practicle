// This is our in-memory data store for authors and books.
// In a real-world app, this would come from a database.
const data = {
  authors: [
    { id: "1", name: "Chirag Goel", bookIds: ["101", "102"] },
    { id: "2", name: "Akshay Saini", bookIds: ["103"] },
  ],
  books: [
    {
      id: "101",
      title: "Namaste Frontend System Design",
      publishedYear: 2000,
      authorId: "1",
    },
    { id: "102", title: "Book 2", publishedYear: 2010, authorId: "1" },
    { id: "103", title: "Book 3", publishedYear: 2020, authorId: "2" },
  ],
};

/*
  GraphQL resolvers are functions that resolve (fetch) the data for each field in your schema.
  Each resolver matches a type and field in your GraphQL schema (see typeDefs.js).
  The structure below matches your schema types: Book, Author, Query, Mutation.
*/

export const resolvers = {
  // Resolver for fields inside the Book type
  Book: {
    // Resolves the 'author' field for a Book.
    // 'parent' is the Book object being resolved.
    author: (parent, args, context, info) => {
      // Find the author whose id matches the book's authorId
      return data.authors.find(
        (authorDetail) => authorDetail.id === parent.authorId
      );
    },
  },
  // Resolver for fields inside the Author type
  Author: {
    // Resolves the 'books' field for an Author.
    // 'parent' is the Author object being resolved.
    books: (parent, args, context, info) => {
      // Filter books whose id is in the author's bookIds array
      return data.books.filter((book) => parent.bookIds.includes(book.id));
    },
  },
  // Root Query resolvers
  Query: {
    // Resolves the 'authors' query, returns all authors
    authors: (parent, args, context, info) => {
      return data.authors;
    },
    // Resolves the 'books' query, returns all books
    books: (parent, args, context, info) => {
      return data.books;
    },
  },
  // Root Mutation resolvers
  Mutation: {
    // Resolves the 'addBook' mutation, adds a new book to the data
    addBook: (parent, args, context, info) => {
      /*
              args contains the arguments passed to the mutation:
              - title: String!
              - publishedYear: Int
              - authorId: ID!
            */
      // Create a new book object. Use a string id for consistency.
      const newBook = {
        id: (data.books.length + 101).toString(), // Generate a new id (e.g., "104")
        title: args.title,
        publishedYear: args.publishedYear,
        authorId: args.authorId,
      };
      // Add the new book to the books array
      data.books.push(newBook);

      // Also update the author's bookIds array
      const author = data.authors.find((a) => a.id === args.authorId);
      if (author) {
        author.bookIds.push(newBook.id);
      }

      // Return the newly created book
      return newBook;
    },
  },
};

/*
  Summary:
  - Each resolver matches a field in your GraphQL schema.
  - 'parent' is the parent object (e.g., Book or Author) being resolved.
  - For nested fields (like Book.author or Author.books), you fetch related data.
  - For root queries/mutations, you return or modify data as needed.
  - This pattern lets GraphQL fetch only the data requested by the client.
*/
