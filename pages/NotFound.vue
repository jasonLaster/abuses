<template>
  <not-found />
</template>

<script>
import NotFound from '~/components/Shared/NotFound.vue'
import metaData from '~/utils/metaData'

export default {
  components: {
    NotFound,
  },
  metaInfo() {
    return metaData({
      title: 'Page not found',
      text: '',
      url: `${process.env.VUE_APP_BASE_URL}${this.$route.path}`,
    })
  },
}
</script>
