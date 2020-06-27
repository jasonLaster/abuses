require('dotenv').config()
const fs = require('fs')

const Airtable = require('airtable')

function extractField(s) {
  return s?.trim() ?? null
}

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base(process.env.AIRTABLE_APP_ID)

const recs = []
base('GeorgeFloyd')
  .select({
    view: 'Grid view',
    // maxRecords: 10, // Omit for unlimited
  })
  .eachPage(
    function page(records, fetchNextPage) {
      records.forEach((record) => {
        const f = record.fields
        recs.push({
          id: extractField(f['TGD number']),
          city: extractField(f.City),
          state: extractField(f.State),
          tweet: extractField(f['Tweet URL']),
          youtube: extractField(f.YouTube),
          text: extractField(f['Doucette Text']),
        })
      })
      fetchNextPage()
    },
    function done(err) {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      const filename = 'videos.json'
      const result = { list: recs }
      fs.writeFileSync(filename, JSON.stringify(result, null, 2))
    },
  )
