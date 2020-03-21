import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { useAlbumsShowQuery, Album } from '../../schemas/dist/client'
import styled from 'styled-components'
import Link from 'next/link'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'

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
      <TrackList album={data.album} />
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
        <Description>
          <h1>{album.albumTitle}</h1>
          <div>
            <Link href="/" as="/">
              <a>{album.artist?.name}</a>
            </Link>
            ・{album.year}
          </div>

          <hr />
          {album.reviews?.length && (
            <div>
              <h4>Reviews</h4>
              {album.reviews.map(review => (
                <Review>
                  <dt>{review.reviewer}</dt>
                  <dd>
                    <RatingScore rate={review.rate!} />
                  </dd>
                </Review>
              ))}
            </div>
          )}
        </Description>
      </Row>
    </div>
  )
}

const RatingScore: React.FC<{ rate: number[] }> = ({ rate: [score, max] }) => {
  if (score === null || max === null) {
    return <div>---</div>
  }

  return (
    <div>
      <strong>{score}</strong>
      &nbsp;/&nbsp;
      {max}
    </div>
  )
}

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AlbumCover = styled.div`
  width: 300px;
  max-width: 50%;
  padding: 0 16px 16px 0;
  line-height: 0;

  img {
    width: 100%;
  }
`

const Description = styled.div`
  flex: 1 0;
`

const Review = styled.dl`
  display: flex;

  dt,
  dl {
    flex: 1 0;
  }
`

const TrackList: React.FC<{ album: Album }> = ({ album }) => {
  const trackGroups = useMemo(() => groupBy(album.tracks, t => t!.side), [album.tracks])
  const sortedTrackGroups = sortBy(Object.entries(trackGroups), ([side]) => side)

  return (
    <>
      {sortedTrackGroups.map(([side, tracks]) => (
        <React.Fragment key={side}>
          <h2>Side {side}</h2>
          <SideTrackList>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
              {sortBy(tracks, t => t!.track).map(track => (
                <tr key={track?.id!}>
                  <td>{track!.mustHearTracks ? '★' : null}</td>
                  <td>{track!.track}</td>
                  <td>{track!.name}</td>
                  <td>{album.artist?.name}</td>
                </tr>
              ))}
            </tbody>
          </SideTrackList>
        </React.Fragment>
      ))}
    </>
  )
}

const SideTrackList = styled.table`
  width: 100%;

  th:nth-of-type(1),
  td:nth-of-type(1) {
    width: 1em;
  }

  th:nth-of-type(2),
  td:nth-of-type(2) {
    width: 4em;
    text-align: right;
  }

  th:nth-of-type(4),
  td:nth-of-type(4) {
    width: 30%;
  }
`
