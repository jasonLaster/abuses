<template>
  <center-wrapper>
    <incident-list :city="city" />
  </center-wrapper>
</template>

<script>
import IncidentList from '@/components/IncidentList.vue'
import CenterWrapper from '@/components/CenterWrapper.vue'

export default {
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
}
</script>

<style module lang="postcss">
.filter-description {
  text-align: center;
  margin-bottom: 1em;
  font-size: 1.125em;
}
</style>
