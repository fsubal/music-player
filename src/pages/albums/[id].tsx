import React from 'react'
import { NextPage } from 'next'
import { useAlbumsShowQuery, Album } from '../../schemas/dist/client'
import styled from 'styled-components'
import Link from 'next/link'

interface Props {
  id: string
}

const AlbumsShow: NextPage<Props> = ({ id }) => {
  const { loading, data, error } = useAlbumsShowQuery({ variables: { id } })

  if (loading) {
    return <>loading...</>
  }

  return data?.album ? (
    <div>
      <AlbumProfile album={data.album} />
    </div>
  ) : error ? (
    <div>Error!</div>
  ) : (
    <div>Not Found</div>
  )
}

AlbumsShow.getInitialProps = async ({ query }): Promise<Props> => {
  return { id: String(query.id) }
}

export default AlbumsShow

const AlbumProfile: React.FC<{ album: Album }> = ({ album }) => {
  return (
    <div>
      <Row>
        <AlbumCover>
          <img src={album.albumCovers[0].url!} alt={album.albumTitle!} />
        </AlbumCover>
        <div>
          <h1>{album.albumTitle}</h1>
          <Link href="/" as="/">
            <a>{album.artist?.name}</a>
          </Link>
        </div>
      </Row>
      <table>
        {album.tracks?.map(track => (
          <tr key={track!}>{track}</tr>
        ))}
      </table>
    </div>
  )
}

const Row = styled.div`
  display: flex;
`

const AlbumCover = styled.div`
  width: 300px;
  max-width: 100%;

  img {
    width: 100%;
  }
`
