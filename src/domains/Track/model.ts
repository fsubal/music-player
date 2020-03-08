import { Album } from '../Album/model'

export interface Track extends BaseEntity<'Track'> {
  name: string
  albums: Album['id'][]
  track: string
  side: 'A' | 'b'
  mustHearTracks: boolean
  specificInstrumentalCredit?: string
}
