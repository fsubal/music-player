import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Track, Album } from '../schemas/dist/client'
import styled from 'styled-components'

interface PlayerState {
  track: Track
  album: Album
}

type TrackPlayer = [PlayerState | null, (next: PlayerState | null) => void]

export const PlayerContext = React.createContext<TrackPlayer>([null, () => {}])

const SoundPlayer: React.FC = ({ children }) => {
  const [playing, setPlaying] = useState<PlayerState | null>(null)

  if (!process.browser) {
    return <>{children}</>
  }

  return (
    <PlayerContext.Provider value={[playing, setPlaying]}>
      {children}
      {createPortal(<PlayerPortal playing={playing} />, document.body)}
    </PlayerContext.Provider>
  )
}

export default SoundPlayer

const PlayerPortal: React.FC<{ playing: PlayerState | null }> = ({ playing }) => {
  // FIXME: store youtube id instead of url
  const id = playing?.track.url ? new URL(playing?.track.url!).searchParams.get('v') : null

  return (
    <>
      {playing === null ? null : (
        <Controller>
          <Inner>
            <h4>🎧 {playing.track.name}</h4>
            <br />
            <ArtistName>{playing.album.artist?.name}</ArtistName>
          </Inner>
          <YoutubePlayer
            width="336"
            height="192"
            src={`https://www.youtube-nocookie.com/embed/${id!}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Controller>
      )}
    </>
  )
}

const Controller = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 336px;
  background: #fff;
  box-shadow: 0 -3px 24px rgba(0, 0, 0, 0.1);
`

const Inner = styled.div`
  padding: 16px;
`

const ArtistName = styled.div`
  color: rgba(0, 0, 0, 0.4);
`

const YoutubePlayer = styled.iframe`
  display: block;
`
