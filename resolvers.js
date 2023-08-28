import { Books, Authors } from './mock.js';

const resolvers = {
  Query: {
    books: () => {
        return Books;
    },
    book: (parent, args) => Books.find((book) => {
      return Number.parseInt(book.id, 10) === Number.parseInt(args.id, 10);
    }),
  },

  Book: {
    author: (parent) => Authors.find((author) => author.id === parent.author)
  }
};

export default resolvers;
