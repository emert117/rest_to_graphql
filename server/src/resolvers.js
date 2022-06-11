const {paginateResults} = require('./utils');

module.exports = {
    Query: {
        bikes: async (_, {pageSize = 20, after}, {dataSources}) => {
            const allBikes = await dataSources.bikeAPI.getAllBikes();
            // we want these in reverse chronological order
            allBikes.reverse();
      
            const bikes = paginateResults({
              after,
              pageSize,
              results: allBikes
            });
      
            return {
              bikes,
              cursor: allBikes.length ? allBikes[allBikes.length - 1].cursor : null,
              // if the cursor at the end of the paginated results is the same as the
              // last item in _all_ results, then there are no more results after this
              hasMore: allBikes.length
                ? allBikes[allBikes.length - 1].cursor !==
                  allBikes[allBikes.length - 1].cursor
                : false
            };
        },
      bike: (_, {bike_id}, {dataSources}) =>
        dataSources.bikeAPI.getBikeById({bike_id: bike_id}),
      me: (_, __, {dataSources}) => dataSources.userAPI.findOrCreateUser()
    },
    User: {        
    },

    Mutation: {
        login: async (_, { email }, { dataSources }) => {
          const user = await dataSources.userAPI.findOrCreateUser({ email });
          if (user) {
            user.token = Buffer.from(email).toString('base64');
            return user;
          }
        },
      },
  };