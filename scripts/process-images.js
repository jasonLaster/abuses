require('dotenv').config()
const Airtable = require('airtable')
const Twitter = require('twitter-lite')
const AWS = require('aws-sdk')
const request = require('request')
const Bottleneck = require('bottleneck')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base(process.env.AIRTABLE_APP_ID)

const user = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
})

const twitterLimiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000,
})

const s3 = new AWS.S3()

const uploadFromUrlToS3 = (url, destPath) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url,
        encoding: null,
      },
      (err, res, body) => {
        if (err) {
          reject(err)
        }
        const objectParams = {
          ContentType: res.headers['content-type'],
          ContentLength: res.headers['content-length'],
          Bucket: process.env.S3_BUCKET_NAME,
          Key: destPath,
          Body: body,
        }
        resolve(s3.putObject(objectParams).promise())
      },
    )
  })
}

;(async () => {
  const response = await user.getBearerToken()
  const app = new Twitter({
    bearer_token: response.access_token,
  })

  base('GeorgeFloyd')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(async (record) => {
          const f = record.fields

          try {
            const tweet = await twitterLimiter.schedule(() =>
              app.get(`statuses/show/${f['Tweet URL'].split('/').pop()}`),
            )

            if (tweet && tweet.extended_entities) {
              const files = tweet.extended_entities.media
                .filter((m) => m.type === 'photo')
                .map((m) => {
                  const file = m.media_url.split('/').pop()
                  uploadFromUrlToS3(m.media_url, file)
                  return file
                })

              await base('GeorgeFloyd').update([
                {
                  id: record.id,
                  fields: {
                    media: files.join(),
                  },
                },
              ])
            }
          } catch (err) {
            console.error(err)
          }
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
        }
      },
    )
})()
