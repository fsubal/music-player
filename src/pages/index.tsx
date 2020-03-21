import React from 'react'
import styled from 'styled-components'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRootIndexQuery, Artist, Album } from '../schemas/dist/client'

const RootIndex: NextPage = () => {
  const { loading, data, error } = useRootIndexQuery()

  if (loading) {
    return <>loading...</>
  }

  return data?.artist ? (
    <div>
      <AlbumList artist={data.artist} />
    </div>
  ) : error ? (
    <div>Error!</div>
  ) : (
    <div>Not Found</div>
  )
}

export default RootIndex

const isEssential = (album: Album) => album.shouldListenAlbum === 'Essential'

const AlbumList: React.FC<{ artist: Artist }> = ({ artist }) => {
  const essential = artist.albums?.find(isEssential)

  return (
    <div>
      {essential && (
        <Jumbotron cover={essential.albumCovers[0].url!} title={artist.name!}>
          <ArtistName>{artist.name}</ArtistName>
        </Jumbotron>
      )}

      <Subheader>Must-hear Albums</Subheader>
      <Grid>
        {artist.albums
          ?.filter(isEssential)
          .slice(0, 3)
          .map(album => (
            <AlbumItem key={album.id!} album={album} />
          ))}
      </Grid>

      <Subheader>All Albums</Subheader>
      <Grid>
        {artist.albums?.map(album => (
          <AlbumItem key={album.id!} album={album} />
        ))}
      </Grid>
    </div>
  )
}

const Jumbotron = styled.div<{ cover: string }>`
  position: relative;
  width: 100%;
  height: 360px;
  background-image: url(${props => props.cover});
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
`

const ArtistName = styled.h1`
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  display: block;
  padding: 16px;
  margin: 0;
  width: 100%;
  background: linear-gradient(to top, #000, transparent);
`

const Subheader = styled.h2`
  padding: 0 16px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row: 1;
  grid-gap: 16px 2%;
  margin-bottom: 24px;
`

const AlbumItem: React.FC<{ album: Album }> = ({ album }) => {
  const [cover] = album.albumCovers

  return (
    <Link href="/albums/[id]" as={`/albums/${album.id}`}>
      <AlbumLink>
        <CoverImage key={cover.url!} src={cover.url!} />
        <AlbumTitle>
          <LineClamp>{album.albumTitle}</LineClamp>
          <Year>{album.year}</Year>
        </AlbumTitle>
      </AlbumLink>
    </Link>
  )
}

const AlbumLink = styled.a`
  cursor: pointer;
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

const LineClamp = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`

const Year = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`

const CoverImage = styled.img`
  display: block;
  width: 100%;
`
