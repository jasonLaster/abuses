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

function extractDateTime(dateField, timeField) {
  date = extractField(dateField)
  time = extractField(timeField)
  const nulls = [date, time].filter((x) => x == null).length
  if (nulls > 0) {
    if (nulls === 1) {
      console.error('Skipping partial date', dateField, timeField)
    }
    return null
  }

  const [year, month, day] = date.match(/../g)
  const s = `20${year}-${month}-${day} ${time} PDT`
  try {
    const result = new Date(s)
    return result.toISOString()
  } catch (e) {
    console.error(`Skipping bad datetime ${dateField} ${timeField}`)
    return null
  }
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
          tweetDateTime: extractDateTime(f['Twitter Date'], f['Twitter Time (PDT)']),
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
