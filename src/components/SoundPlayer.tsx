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
  return (
    <Controller>
      <Inner>
        {playing === null ? (
          '---'
        ) : (
          <>
            🎧&nbsp;
            <CoverThumbnail src={playing.album.albumCovers[0].url!} />
            &nbsp;
            {playing.track.name} / {playing.album.artist?.name}
            <ProgressBar />
            <a href="#">⏪</a>
            <a href="#">⏸</a>
            <a href="#">⏩</a>
          </>
        )}
      </Inner>
    </Controller>
  )
}

const CoverThumbnail = styled.img`
  width: 1em;
  height: 1em;
`

const Controller = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 -3px 24px rgba(0, 0, 0, 0.1);
`

const Inner = styled.div`
  display: flex;
  align-items: center;
  max-width: 768px;
  padding: 16px;
  margin: 0 auto;
`

const ProgressBar = styled.div`
  flex: 1 0;
`
