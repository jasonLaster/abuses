import { createApolloFetch } from 'apollo-fetch'
import { apiUrl } from './../data/siteDetails'
import {
  homePageId,
  arrangementsPageId,
  roomsPageId,
  blogPageId,
  contactPageId,
} from './../data/pages'

const getExcludesPages = () => {
  const excludePageIDS = []
  Object.values([
    homePageId,
    arrangementsPageId,
    roomsPageId,
    blogPageId,
    contactPageId,
  ]).forEach((page) => {
    excludePageIDS.push(...Object.values(page))
  })
  return excludePageIDS
}

export default {
  fallback: true,
  async routes() {
    const uri = `${apiUrl}graphql`

    const query = `
      query Sitemap($notIn: [ID]) {
        pages(first: 99, where: { notIn: $notIn }) {
          edges {
            node {
              relativeUrl
              childPages {
                edges {
                  node {
                    relativeUrl
                  }
                }
              }
            }
          }
        }
        posts(first: 99) {
          edges {
            node {
              relativeUrl
            }
          }
        }
        rooms(first: 99) {
          edges {
            node {
              relativeUrl
            }
          }
        }
        arrangements(first: 99) {
          edges {
            node {
              relativeUrl
            }
          }
        }
      }
    `

    const variables = {
      notIn: getExcludesPages(),
    }

    const apolloFetch = createApolloFetch({ uri })
    const result = await apolloFetch({ query, variables }) // all apolloFetch arguments are optional
    const { pages, posts, rooms, arrangements } = result.data

    const pagesToGenerate = []
    pages.edges.forEach((page) => {
      pagesToGenerate.push(page)
      if (page.node.childPages.edges) {
        page.node.childPages.edges.forEach((childPage) => {
          pagesToGenerate.push(childPage)
        })
      }
    })

    const urls = [
      ...pagesToGenerate,
      ...posts.edges,
      ...rooms.edges,
      ...arrangements.edges,
    ]
    return urls.map((url) => {
      return url.node.relativeUrl
    })
  },
}
