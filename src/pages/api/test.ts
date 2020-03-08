import airtable, { toEntity } from '../../api/airtable'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rows = (
      await airtable('Video tracker')
        .select()
        .firstPage()
    ).map(toEntity)

    res.status(200).json(rows)
  } catch (e) {
    res.status(e.statusCode).json({})
  }
}
