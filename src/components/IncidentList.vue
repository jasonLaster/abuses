<template>
  <center-wrapper>
    <ul class="list">
      <incident-list-item v-for="incident in list" :key="incident.id" :incident="incident" />
    </ul>
  </center-wrapper>
</template>

<script>
import IncidentListItem from '@/components/IncidentListItem.vue'
import CenterWrapper from '@/components/CenterWrapper.vue'
import useIncidents from '@/use/incidents'

export default {
  setup() {
    const { list } = useIncidents()
    return { list }
  },
  components: {
    IncidentListItem,
    CenterWrapper,
  },
}
</script>

<style scoped lang="postcss">
.list {
  @mixin list-reset;

  display: grid;
  grid-gap: 0.75em 1em;
  margin-top: 1em;

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
  }
}
</style>
