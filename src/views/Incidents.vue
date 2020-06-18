<template>
  <div class="wrapper">
    <incident-details />
    <incident-list :city="city" />
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
  props: {
    city: {
      type: String,
      default: '',
    },
  },
}
</script>
