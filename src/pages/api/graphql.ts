import { ApolloServer } from 'apollo-server-micro'
import airtable, { toEntity } from '../../lib/airtable'
import typeDefs from './schema.gql'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      async albums() {
        return airtable('Albums')
          .select()
          .all()
          .then(records => records.map(toEntity))
      },
      async album(_source, { id }) {
        return airtable('Albums')
          .find(id)
          .then(toEntity)
      },
    },
    Album: {
      albumTitle(album: any) {
        return album['Album Title']
      },
      albumCovers(album: any) {
        return album['Album Cover(s)']
      },
      tracks(album: any) {
        return album['Tracks']
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
