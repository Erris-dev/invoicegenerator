import  { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import fetch from "cross-fetch";


const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API || 'http://localhost:4000/graphql',
  fetch,
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
