<template>
  <not-found />
</template>

<script>
import NotFound from '~/components/Shared/NotFound.vue'
import getSeoMetaData from '~/helpers/seo'

export default {
  components: {
    NotFound,
  },
  head() {
    return getSeoMetaData({
      title: 'Page not found',
      text: '',
      path: this.$route.path,
    })
  },
}
</script>
