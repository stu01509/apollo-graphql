import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

const app = express();
const PORT = 3000;

const AUTHORS = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' }
]

const BOOKS = [
  { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
  { id: 3, name: 'The Fellowship of the Ring', authorId: 2 },
  { id: 5, name: 'The Two Towers', authorId: 2 },
  { id: 6, name: 'The Return of the King', authorId: 2 },
  { id: 7, name: 'The Way of Shadows', authorId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  description: 'Get a author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return BOOKS.filter((book) => book.authorId === author.id);
      }
    }
  }),
});

const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Book',
  description: 'Get a book',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return AUTHORS.find((author) => book.id === author.id)
      },
    }
  }),
});

const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'Get a book',
      args: {
        id: {
          type: GraphQLInt,
        }
      },
      resolve: (source, args) => BOOKS.find(book => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'Get all books',
      resolve: () => BOOKS,
    },
    author: {
      type: AuthorType,
      description: 'Get a author',
      args: {
        id: {
          type: GraphQLInt,
        }
      },
      resolve: (source, args) => AUTHORS.find(author => author.id === args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'Get all authors',
      resolve: () => AUTHORS,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    createBook: {
      type: BookType,
      description: 'Create book',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (soruce, args) => {
        const book = { id: BOOKS.length + 1, name: args.name, authorId: args.authorId };
        BOOKS.push(book);
        return book;
      }
    },
    createAuthor: {
      type: AuthorType,
      description: 'Create author',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (soruce, args) => {
        const author = { id: AUTHORS.length + 1, name: args.name};
        AUTHORS.push(author);
        return author;
      }
    }
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
}));

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));