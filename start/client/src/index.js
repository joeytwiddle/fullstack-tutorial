import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import ReactDOM from 'react-dom';
import Pages from './pages';
import Login from './pages/login';
import { resolvers, typeDefs } from './resolvers';

const cache = new InMemoryCache();

// Simple client without authentication
/*
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
  cache,
  link
});
*/

// Client with authentication
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token'),
    },
  }),
  // Client side types and resolvers (for local state)
  typeDefs,
  resolvers,
});

// Initialise cache
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  },
});

//client.query({ query: gql` query GetLaunch { launch(id: 56) { id mission { name } } } ` }).then(result => console.log('result:', result));
// result: { data: { launch: { id: '56', mission: { name: 'Paz / Starlink Demo', __typename: 'Mission' }, __typename: 'Launch' } }, loading: false, networkStatus: 7, stale: false }

const IS_LOGGED_IN = gql`
  # Here @client indicates a local query (will be synchronous, use local cache, no need to hit remote)
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({ data }) => (data.isLoggedIn ? <Pages /> : <Login />)}
    </Query>
  </ApolloProvider>,
  document.getElementById('root')
);
