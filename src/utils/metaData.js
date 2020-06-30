export default ({ title, text, url }) => {
  return {
    title,
    meta: [
      {
        name: 'description',
        content: text,
      },
      {
        name: 'og:title',
        content: title,
      },
      {
        name: 'og:description',
        content: text,
      },
      {
        name: 'og:url',
        content: url,
      },
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: text,
      },
    ],
  }
}
