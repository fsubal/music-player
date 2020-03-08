import { ApolloServer, gql } from 'apollo-server-micro'
import airtable, { toEntity } from '../../lib/airtable'

const typeDefs = gql`
  type Thumbnail {
    url: String!
    width: Int!
    height: Int!
  }

  type Thumbnails {
    small: Thumbnail
    large: Thumbnail
    full: Thumbnail
  }

  type Attachment {
    id: String!
    url: String!
    filename: String!
    size: Int!
    type: String!
    thumbnails: Thumbnails
  }

  type Track {
    name: String!
    albums: [ID]!
    track: String!
    side: String!
    mustHearTracks: Boolean
    specificInstrumentalCredit: String
  }

  type Album {
    albumTitle: String
    albumCovers: [Attachment]!
    tracks: [ID]!
  }

  type Query {
    albums: [Album]!
  }
`

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
