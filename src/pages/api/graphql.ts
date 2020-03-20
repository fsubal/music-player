import { ApolloServer } from 'apollo-server-micro'
import airtable, { toEntity } from '../../lib/airtable'
import airtableTypeDefs from '../../schemas/typedefs/airtable.gql'

const apolloServer = new ApolloServer({
  typeDefs: airtableTypeDefs,
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
      artist() {
        return {
          name: 'David Bowie',
        }
      },
      albumTitle(album: any) {
        return album['Album Title']
      },
      albumCovers(album: any) {
        return album['Album Cover(s)']
      },
      shouldListenAlbum(album: any) {
        return album['Should I Listen?']
      },
      year(album: any) {
        return album['Year']
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
