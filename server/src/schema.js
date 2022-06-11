const {gql} = require('apollo-server');

const typeDefs = gql`
  type Query {
    bikes(
    pageSize: Int
    after: String
  ): BikeConnection!
  bike(bike_id: ID!): Bike
  me: User
}

type BikeConnection { # add this below the Query type as an additional type.
  cursor: String!
  hasMore: Boolean!
  bikes: [Bike]!
}

type Mutation {  
  login(email: String): User
}

type Bike {
  bike_id: ID!
  lat: Float
  lon: Float
  is_reserved: Boolean
  is_disabled: Boolean
  vehicle_type: String
  total_bookings: Int
  android: String
  ios: String
}

type User {
  id: ID!
  email: String!
  token: String
}
`;

module.exports = typeDefs;