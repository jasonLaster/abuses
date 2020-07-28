<template>
  <div>
    <incidents-list v-if="incidents.length > 0" :incidents="incidents" :title="listTitle" />
    <not-found v-else noun="city" />
  </div>
</template>

<script>
import NotFound from '~/components/Shared/NotFound.vue'
import IncidentsList from '~/components/IncidentsList/IncidentsList.vue'
import useIncidents from '~/use/incidents'
import metaData from '~/utils/metaData'

// temp fix while we're not using https://kazupon.github.io/vue-i18n/
const pluralize = (n, singular, plural) => {
  return `${n === 1 ? singular : plural}`
}

export default {
  setup() {
    const { getFilteredList } = useIncidents()
    return { getFilteredList }
  },
  components: {
    IncidentsList,
    NotFound,
  },
  props: {
    city: {
      type: String,
      default: '',
    },
  },
  computed: {
    listTitle() {
      return `Showing
      ${this.incidents.length}
      ${pluralize(this.incidents.length, 'incident', 'incidents')}
      in
      ${this.city ? this.city : 'all cities'}`
    },
    incidents() {
      return this.getFilteredList(this.city)
    },
  },
  metaInfo() {
    return metaData({
      title: process.env.VUE_APP_TITLE,
      text: this.listTitle,
      url: `${process.env.VUE_APP_BASE_URL}${this.$route.path}`,
    })
  },
}
</script>
