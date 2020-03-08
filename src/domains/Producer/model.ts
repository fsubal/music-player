import { Attachment } from '../../lib/airtable'
import { Album } from '../Album/model'

export interface Producer extends BaseEntity<'Producer'> {
  name: string
  notes: string[]
  attachements: Attachment[]
  albums: Album['id'][]
}
