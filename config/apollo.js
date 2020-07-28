import { apiUrl } from './../data/siteDetails'

export default {
  clientConfigs: {
    default: {
      // required
      httpEndpoint: `${apiUrl}graphql`,
      httpLinkOptions: {
        credentials: 'include',
      },
    },
  },
}
