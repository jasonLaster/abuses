<template>
  <section v-if="incidents.length" aria-labelledby="incident-list">
    <h2 id="incident-list" :class="$style['filter-description']">
      {{ title }}
    </h2>
    <ul :class="$style.list">
      <incident-list-item v-for="incident in incidents" :key="incident.id" :incident="incident" />
    </ul>
  </section>
</template>

<script>
import IncidentListItem from '@/components/IncidentListItem.vue'

export default {
  components: {
    IncidentListItem,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    incidents: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style module lang="postcss">
.list {
  @mixin list-reset;

  display: grid;
  grid-gap: var(--spacing-m);

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  }
}

.filter-description {
  margin-bottom: 1em;
}
</style>
