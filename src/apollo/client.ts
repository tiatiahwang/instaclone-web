import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const TOKEN = 'token';

const httpLink = createHttpLink({
  uri: 'http://localhost:4050/graphql',
});

const authLink = setContext((_, { headers }) => ({
  headers: { ...headers, token: localStorage.getItem(TOKEN) },
}));

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
