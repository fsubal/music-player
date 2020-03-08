import Airtable from 'airtable'

export type Attachment = Airtable.Attachment

const airtable = new Airtable({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY!,
})

/**
 * DON'T import this in client side ( it would fail ).
 *
 * - don't import this from /components
 * - don't import this from /pages, except for /pages/api
 */
export default airtable.base(process.env.AIRTABLE_WORKSPACE_ID!)

export const toEntity = <T>({ id, fields }: Airtable.Record<T>): T & { id: string } => ({
  id,
  ...fields,
})
