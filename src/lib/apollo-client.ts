import 'isomorphic-unfetch'
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:3000/api/graphql' }),
  cache: new InMemoryCache(),
})
