require('dotenv').config()
const fs = require('fs')

const Airtable = require('airtable')

function extractField(s) {
  return s?.trim() || null
}

// TODO(dmnd): Get rid of this stuff by enforcing consistency in AirTable...
const badYouTubeUrls = new Set()
const YT_REGEX = [
  new RegExp('^(?:https://)?youtu.be/([\\w-]+)(?:\\?.*)?$'),
  new RegExp('^https://(?:www\\.)?youtube\\.com/watch\\?v=([\\w-]+)(?:\\?.*)?$'),
]

function extractYouTubeField(s) {
  const url = extractField(s)
  if (url == null) {
    return null
  }

  for (const re of YT_REGEX) {
    let match = url.match(re)
    if (match) {
      return match[1]
    }
  }
  badYouTubeUrls.add(url)
  return null
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
          id: extractField(f['TGD Number']),
          city: extractField(f.City),
          state: extractField(f.State),
          tweet: extractField(f['Tweet URL']),
          file: extractField(f['Video/Image Filename']),
          youtube: extractYouTubeField(f.YouTube),
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
      // Put "0." GCDs at the end to make diffs better
      const list = [
        ...recs.filter(({ id }) => !id.startsWith('0.')),
        ...recs.filter(({ id }) => id.startsWith('0.')),
      ]

      const result = { list }
      fs.writeFileSync('src/data/incidents.json', JSON.stringify(list, null, 2) + '\n')
      if (badYouTubeUrls.size > 0) {
        console.error('Ignored YouTube urls')
        for (const url of badYouTubeUrls) {
          console.log(url)
        }
      }
    },
  )
