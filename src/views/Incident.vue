<template>
  <div>
    <center-wrapper>
      <btn-back :to="{ name: 'Root' }" title="Back to the list" />
      <incident-details :incident="incident" />
    </center-wrapper>
    <incidents-list :incidents="incidents" :title="listTitle" />
  </div>
</template>

<script>
import useIncidents from '@/use/incidents'
import IncidentDetails from '@/components/IncidentDetails/IncidentDetails.vue'
import CenterWrapper from '@/components/Layout/CenterWrapper.vue'
import BtnBack from '@/components/Shared/BtnBack.vue'
import IncidentsList from '@/components/IncidentsList/IncidentsList.vue'

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
    IncidentsList,
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
