<template>
  <div>
    <incident-list v-if="incidents.length > 0" :incidents="incidents" :title="listTitle" />
    <not-found v-if="incidents.length === 0" />
  </div>
</template>

<script>
import NotFound from '@/views/NotFound.vue'
import IncidentList from '@/components/IncidentList.vue'
import useIncidents from '@/use/incidents'

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
    IncidentList,
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
}
</script>
