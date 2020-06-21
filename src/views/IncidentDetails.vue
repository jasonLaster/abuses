<template>
  <center-wrapper>
    <btn-back title="Back to the list" />
    <incident-details :incident="incident" />
    <incident-list :city="incident.city" :exclude-id="incident.id" />
  </center-wrapper>
</template>

<script>
import IncidentDetails from '@/components/IncidentDetails.vue'
import useIncidents from '@/use/incidents'
import CenterWrapper from '@/components/CenterWrapper.vue'
import BtnBack from '@/components/BtnBack.vue'
import IncidentList from '@/components/IncidentList.vue'

export default {
  setup() {
    const { getIncidentTitle, getIncidentByID } = useIncidents()
    return { getIncidentTitle, getIncidentByID }
  },
  components: {
    BtnBack,
    IncidentDetails,
    CenterWrapper,
    IncidentList,
  },

  computed: {
    incident() {
      const { id } = this.$route.params
      return this.getIncidentByID(id)
    },
  },
}
</script>
