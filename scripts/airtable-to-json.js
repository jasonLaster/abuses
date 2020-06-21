require('dotenv').config()
const fs = require('fs')

const Airtable = require('airtable')

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
          id: f['TGD number'] || null,
          city: f.City || null,
          state: f.State || null,
          tweet: f['Tweet URL'],
          youtube: f.YouTube,
          text: f['Doucette Text'],
        })
      })
      fetchNextPage()
    },
    function done(err) {
      if (err) { console.error(err); return; }
      const filename = `videos-${Date.now()}.json`
      const result = { list: recs }
      fs.writeFileSync(filename, JSON.stringify(result, null, 2))
  })
