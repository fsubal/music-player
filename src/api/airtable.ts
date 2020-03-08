import Airtable from 'airtable'

const airtable = new Airtable({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY!,
})

export default airtable.base(process.env.AIRTABLE_WORKSPACE_ID!)
