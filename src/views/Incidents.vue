<template>
  <div id="app">
    <the-header :city="city" />
    <div class="wrapper">
      <incident-details />
      <incident-list :city="city" />
    </div>
  </div>
</template>

<script>
import IncidentDetails from '@/components/IncidentDetails.vue'
import IncidentList from '@/components/IncidentList.vue'
import TheHeader from '@/components/TheHeader.vue'

export default {
  components: {
    IncidentDetails,
    IncidentList,
    TheHeader,
  },
  props: {
    city: {
      type: String,
      default: '',
    },
  },
}
</script>
