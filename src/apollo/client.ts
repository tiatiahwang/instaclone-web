import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4050/graphql',
  cache: new InMemoryCache(),
});
