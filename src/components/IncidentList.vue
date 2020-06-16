<template>
  <div :class="$style.wrapper">
    <center-wrapper>
      <ul :class="$style.list">
        <incident-list-item
          v-for="incident in state.list"
          :key="incident.id"
          :incident="incident"
        />
      </ul>
    </center-wrapper>
  </div>
</template>

<script>
import IncidentListItem from '@/components/IncidentListItem.vue'
import CenterWrapper from '@/components/CenterWrapper.vue'
import useIncidents from '@/use/incidents'

export default {
  setup() {
    const { state } = useIncidents()
    return { state }
  },
  components: {
    IncidentListItem,
    CenterWrapper,
  },
}
</script>

<style module lang="postcss">
.list {
  @mixin list-reset;

  display: grid;
  grid-gap: 0.75em 1em;

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
  }
}

.wrapper {
  background: var(--color-white);
  padding: 1.5em 0;
}
</style>
