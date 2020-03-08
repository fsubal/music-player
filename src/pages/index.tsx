import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import apolloClient from '../lib/apollo-client'
import gql from 'graphql-tag'
import { Album } from '../domains/schema'

interface Props {
  albums: (Pick<Album, 'id' | 'albumTitle'> & {
    albumCovers: {
      url: string
    }[]
  })[]
}

const RootIndex: NextPage<Props> = ({ albums }) => (
  <div>
    <div>
      {albums.map(album => (
        <Link key={album.id!} href="/tracks/[id]" as={`/tracks/${album.id}`}>
          <a>
            {album.albumTitle}
            <br />
            {album.albumCovers.map(cover => (
              <img key={cover.url} src={cover.url} />
            ))}
          </a>
        </Link>
      ))}
    </div>
  </div>
)

RootIndex.getInitialProps = async (): Promise<Props> => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query {
        albums {
          id
          albumTitle
          albumCovers {
            url
          }
        }
      }
    `,
  })

  if (errors) {
    throw errors
  }

  return data
}

export default RootIndex
