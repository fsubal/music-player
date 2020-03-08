import { Attachment } from '../../lib/airtable'

export interface Album extends BaseEntity<'Album'> {
  albumTitle: string
  albumCovers: Attachment[]
}
