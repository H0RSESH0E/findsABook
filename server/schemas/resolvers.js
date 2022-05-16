const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
      // console.log(context.tokenDeets);
      // console.table(context.user);

      if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate('thoughts')
              .populate('friends');

          return userData;
      }

      throw new AuthenticationError('Not logged in');
  },
    },
    Mutation: {
      addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);

          return { token, user };
      },
      login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });

          if (!user) {
              throw new AuthenticationError('Incorrect credentials');
          }

          const correctPw = await user.isCorrectPassword(password);

          if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
          }

          const token = signToken(user);
          return { token, user };
      },
      saveBook: async (parent, { bookData }, context) => {


        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        ).populate('savedBooks');
    
        return updatedUser;
      },
      deleteBook: async (parent, {bookId}) => {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } },
          { new: true }
        ).populate('savedBooks');
    
        return updatedUser;
      }
  }
  };
  
  module.exports = resolvers;