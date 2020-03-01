import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      sayHello() {
        return 'Hello World!'
      },
    },
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
