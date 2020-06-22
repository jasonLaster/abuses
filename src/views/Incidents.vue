<template>
  <center-wrapper>
    <incident-list :incidents="incidents" :title="listTitle" />
  </center-wrapper>
</template>

<script>
import IncidentList from '@/components/IncidentList.vue'
import CenterWrapper from '@/components/CenterWrapper.vue'
import useIncidents from '@/use/incidents'

// temp fix while we're not using https://kazupon.github.io/vue-i18n/
const pluralize = (n, singular, plural) => {
  return `${n === 1 ? singular : plural}`
}

export default {
  setup() {
    const { getFilterList } = useIncidents()
    return { getFilterList }
  },
  components: {
    IncidentList,
    CenterWrapper,
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
      return this.getFilterList(this.city)
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
