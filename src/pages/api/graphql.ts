import { ApolloServer } from 'apollo-server-micro'
import airtable, { toEntity } from '../../lib/airtable'
import airtableTypeDefs from '../../schemas/typedefs/airtable.gql'

const ARTIST = {
  name: 'David Bowie',
}

const apolloServer = new ApolloServer({
  typeDefs: airtableTypeDefs,
  resolvers: {
    Query: {
      async album(_source, { id }) {
        return airtable('Albums')
          .find(id)
          .then(toEntity)
      },
      async artist() {
        return {
          ...ARTIST,
          albums: await airtable('Albums')
            .select()
            .all()
            .then(records => records.map(toEntity)),
        }
      },
    },
    Album: {
      artist() {
        return ARTIST
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
      async tracks(album: any) {
        // FIXME: n + 1
        return Promise.all(
          album['Tracks'].map((id: string) =>
            airtable('Tracks')
              .find(id)
              .then(toEntity),
          ),
        )
      },
    },
    Track: {
      track(track: any) {
        return Number(track['Track #'])
      },
      side(track: any) {
        return track['Side']
      },
      mustHearTracks(track: any) {
        return track['Must-Hear Tracks']
      },
      name(track: any) {
        return track['Name']
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
