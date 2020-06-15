<template>
  <div class="wrapper">
    <incident-details />
    <incident-list />
  </div>
</template>

<script>
import IncidentDetails from '@/components/IncidentDetails.vue'
import IncidentList from '@/components/IncidentList.vue'

export default {
  components: {
    IncidentDetails,
    IncidentList,
  },
}
</script>
