<template>
  <center-wrapper>
    <section v-if="incidents.length" aria-labelledby="incident-list">
      <h2 id="incident-list" :class="$style['filter-description']">
        {{ title }}
      </h2>
      <ul :class="$style.list">
        <incidents-list-item
          v-for="incident in incidents"
          :key="incident.id"
          :incident="incident"
        />
      </ul>
    </section>
  </center-wrapper>
</template>

<script>
import IncidentsListItem from '@/components/IncidentsList/IncidentsListItem.vue'
import CenterWrapper from '@/components/Layout/CenterWrapper.vue'

export default {
  components: {
    IncidentsListItem,
    CenterWrapper,
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
  grid-gap: var(--gutter);
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  }
}

.filter-description {
  margin-bottom: 1em;
}
</style>
