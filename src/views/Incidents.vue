<template>
  <incident-list :city="city" />
</template>

<script>
import IncidentList from '@/components/IncidentList.vue'

export default {
  components: {
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
