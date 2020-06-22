<template>
  <center-wrapper>
    <btn-back :to="{ name: 'Root' }" title="Back to the list" />
    <incident-details :incident="incident" />
    <incident-list :incidents="incidents" :title="listTitle" />
  </center-wrapper>
</template>

<script>
import IncidentDetails from '@/components/IncidentDetails.vue'
import useIncidents from '@/use/incidents'
import CenterWrapper from '@/components/CenterWrapper.vue'
import BtnBack from '@/components/BtnBack.vue'
import IncidentList from '@/components/IncidentList.vue'

// temp fix while we're not using https://kazupon.github.io/vue-i18n/
const pluralize = (n, singular, plural) => {
  return `${n === 1 ? singular : plural}`
}

export default {
  setup() {
    const { getIncidentByID, getFilteredList } = useIncidents()
    return { getIncidentByID, getFilteredList }
  },
  components: {
    BtnBack,
    IncidentDetails,
    CenterWrapper,
    IncidentList,
  },

  computed: {
    listTitle() {
      return `Showing
      ${this.incidents.length}
      other
      ${pluralize(this.incidents.length, 'incident', 'incidents')}
      in
      ${this.incident.city}`
    },
    incidents() {
      return this.getFilteredList(this.incident.city, this.incident.id)
    },
    incident() {
      const { id } = this.$route.params
      return this.getIncidentByID(id)
    },
  },
}
</script>
