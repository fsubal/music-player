import airtable from '../../api/airtable'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rows = await airtable('Video tracker')
      .select()
      .firstPage()
    res.status(200).json(rows)
  } catch (e) {
    res.status(e.statusCode).json({})
  }
}
