import { baseUrl } from '~/data/siteDetails'

export default ({ title, text, path, image }) => {
  const url = `${baseUrl}${path}`
  console.log(url)
  return {
    title,
    meta: [
      {
        name: 'description',
        hid: 'description',
        content: text,
      },
      // Open Graph
      {
        hid: 'og:title',
        name: 'og:title',
        content: title,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: text,
      },
      {
        name: 'og:url',
        content: url,
      },
      { name: 'og:image', content: image },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },

      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: text,
      },
      { name: 'twitter:image', image },
      { name: 'twitter:image:alt', title },
    ],
  }
}
