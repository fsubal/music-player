import React from 'react'
import styled from 'styled-components'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRootIndexQuery, RootIndexQuery } from '../schemas/dist/client'

const RootIndex: NextPage = () => {
  const { loading, data, error } = useRootIndexQuery()

  if (loading) {
    return <>loading...</>
  }

  return data?.albums ? (
    <Grid>
      {data.albums.map(album => (
        <AlbumItem key={album.id!} album={album} />
      ))}
    </Grid>
  ) : error ? (
    <div>Error!</div>
  ) : (
    <div>Not Found</div>
  )
}

export default RootIndex

const Grid = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
`

type Album = RootIndexQuery['albums'] extends Array<infer Album> ? Album : never

const AlbumItem: React.FC<{ album: Album }> = ({ album }) => {
  const [cover] = album.albumCovers

  return (
    <Link href="/tracks/[id]" as={`/tracks/${album.id}`}>
      <AlbumLink>
        <CoverImage key={cover.url} src={cover.url} />
        <AlbumTitle>{album.albumTitle}</AlbumTitle>
      </AlbumLink>
    </Link>
  )
}

const AlbumLink = styled.a`
  position: relative;
  display: block;
`

const AlbumTitle = styled.div`
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 16px;
  bottom: 0;
  left: 0;
`

const CoverImage = styled.img`
  display: block;
  width: 100%;
`
