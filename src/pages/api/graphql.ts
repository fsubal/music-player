import fs from 'fs'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server-micro'
import airtable, { toEntity } from '../../lib/airtable'

const schema = fs.readFileSync(path.join(__dirname, 'schema.gql')).toString()
const typeDefs = gql(schema)

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
