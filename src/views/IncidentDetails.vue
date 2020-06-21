<template>
  <incident-details :incident="incident" />
</template>

<script>
import IncidentDetails from '@/components/IncidentDetails.vue'
import useIncidents from '@/use/incidents'

export default {
  setup() {
    const { getIncidentTitle, getIncidentByID } = useIncidents()
    return { getIncidentTitle, getIncidentByID }
  },
  components: {
    IncidentDetails,
  },

  computed: {
    incident() {
      const { id } = this.$route.params
      return this.getIncidentByID(id)
    },
  },
}
</script>
