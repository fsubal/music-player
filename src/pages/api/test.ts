import airtable, { toEntity } from '../../lib/airtable'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rows = (
      await airtable('Albums')
        .select()
        .all()
    ).map(toEntity)

    res.status(200).json(rows)
  } catch (e) {
    res.status(e.statusCode).json({})
  }
}
