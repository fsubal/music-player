import airtable, { toEntity } from '../../lib/airtable'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rows = (
      await airtable('David Bowie 1969-1983: The Golden Years')
        .select()
        .firstPage()
    ).map(toEntity)

    res.status(200).json(rows)
  } catch (e) {
    res.status(e.statusCode).json({})
  }
}
