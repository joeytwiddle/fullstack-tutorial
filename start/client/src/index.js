import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Pages from './pages';
import gql from 'graphql-tag';

const cache = new InMemoryCache();

const link = new HttpLink({
    uri: 'http://localhost:4000/'
})

const client = new ApolloClient({
    cache,
    link
})

//client.query({ query: gql` query GetLaunch { launch(id: 56) { id mission { name } } } ` }).then(result => console.log('result:', result));
// result: { data: { launch: { id: '56', mission: { name: 'Paz / Starlink Demo', __typename: 'Mission' }, __typename: 'Launch' } }, loading: false, networkStatus: 7, stale: false }

ReactDOM.render(
    <ApolloProvider client={client}>
        <Pages />
    </ApolloProvider>,
    document.getElementById('root')
);
