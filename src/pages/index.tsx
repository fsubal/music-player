import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRootIndexQuery } from '../schemas/dist/client'

const RootIndex: NextPage = () => {
  const { loading, data, error } = useRootIndexQuery()

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
