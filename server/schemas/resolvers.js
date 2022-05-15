const resolvers = {
    Query: {
      keyName: () => {
        return 'some database data that will be gathered by Mongoose from MongoDB';
      }
    }
  };
  
  module.exports = resolvers;