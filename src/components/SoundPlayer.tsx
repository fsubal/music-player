import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Track } from '../schemas/dist/client'
import styled from 'styled-components'

type TrackPlayer = [Track | null, (next: Track | null) => void]

const Sound = React.createContext<TrackPlayer | null>(null)

const SoundPlayer: React.FC = ({ children }) => {
  const [track, setTrack] = useState<Track | null>(null)

  if (!process.browser) {
    return <>{children}</>
  }

  return (
    <Sound.Provider value={[track, setTrack]}>
      {children}
      {createPortal(
        <Controller>
          <Inner>▶ not playing</Inner>
        </Controller>,
        document.body,
      )}
    </Sound.Provider>
  )
}

export default SoundPlayer

const Controller = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
`

const Inner = styled.div`
  max-width: 768px;
  padding: 16px;
  margin: 0 auto;
`
