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
  // InMemoryCache를 이용해서 스키마에 각각의 type에 대한 캐시 ID를 생성하는 방법을 커스터마이징
  cache: new InMemoryCache({
    typePolicies: {
      User: { keyFields: (obj) => `User:${obj.username}` },
    },
  }),
});
