<template>
  <incident-list :incidents="incidents" :title="listTitle" />
</template>

<script>
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

<style module lang="postcss">
.filter-description {
  text-align: center;
  margin-bottom: 1em;
  font-size: 1.125em;
}
</style>
