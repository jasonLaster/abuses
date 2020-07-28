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
import getSeoMetaData from '~/helpers/seo'

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

  computed: {
    city() {
      return this.$route.params.city
    },
    listTitle() {
      return `Showing
      ${this.incidents.length}
      ${pluralize(this.incidents.length, 'incident', 'incidents')}
      in
      ${this.city}`
    },
    incidents() {
      return this.getFilteredList(this.city)
    },
  },
  head() {
    return getSeoMetaData({
      title: this.city,
      text: '203 videos of Police Abuses',
      path: '',
    })
  },
}
</script>
