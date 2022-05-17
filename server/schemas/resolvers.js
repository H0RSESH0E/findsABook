const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log('^^ USER: "', context.user.username, '" requested: /server/schemas/resolvers.js: resolvers: me: ');
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log('^^ UNKNOWN: "', args.email, '" requested: /server/schemas/resolvers.js: resolvers: addUser: ', args ? 'arguments were received' : 'no arguments received');

      const user = await User.create(args);
      const token = signToken(user);
      console.log('They were logged in');
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log('^^ UNKNOWN: "', email, '" requested: /server/schemas/resolvers.js: resolvers: login: ', password ? 'a password was submitted' : 'no password was submitted');

      const user = await User.findOne({ email });

      if (!user) {
        console.log('They were not logged in');
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log('They were not logged in');
        throw new AuthenticationError('Incorrect credentials');
      }
      console.log('They were logged in');

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      console.log('^^ USER: "', context.user.username, '" requested: /server/schemas/resolvers.js: resolvers: saveBook: variable(s) received = ', bookData);

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: bookData } },
        { new: true }
      ).populate('savedBooks');

      return updatedUser;
    },
    deleteBook: async (parent, { bookId }, context) => {
      console.log('^^ USER: "', context.user.username, '" requested: /server/schemas/resolvers.js: resolvers: deleteBook: variable(s) received = ', bookId);
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: {bookId: bookId }} },
        { new: true }
      ).populate('savedBooks');

      return updatedUser;
    }
  }
};

module.exports = resolvers;