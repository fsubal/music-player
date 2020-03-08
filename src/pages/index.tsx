import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Album } from '../domains/schema'
import { useQuery } from '@apollo/react-hooks'

interface Props {
  albums: (Pick<Album, 'id' | 'albumTitle'> & {
    albumCovers: {
      url: string
    }[]
  })[]
}

const RootIndex: NextPage<Props> = () => {
  const { loading, data, error } = useQuery<Props>(require('./index.gql'))

  if (loading) {
    return <>loading...</>
  }

  return data?.albums ? (
    <div>
      <div>
        {data.albums.map(album => (
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
  ) : error ? (
    <div>Error!</div>
  ) : (
    <div>Not Found</div>
  )
}

export default RootIndex
