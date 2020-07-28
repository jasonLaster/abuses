<template>
  <header>
    <center-wrapper :top="true">
      <div class="leadin">A video archive of</div>
      <h1><nuxt-link to="/">Police Abuses</nuxt-link></h1>
      <div class="leadout">{{ total }} Videos</div>
      <incident-filter v-if="showFilter" :value="city" />
    </center-wrapper>
  </header>
</template>

<script>
import CenterWrapper from '~/components/Layout/CenterWrapper.vue'
import IncidentFilter from '~/components/IncidentsList/IncidentsFilter.vue'
import useIncidents from '~/use/incidents'

export default {
  setup() {
    const { total } = useIncidents()

    return { total }
  },
  components: {
    CenterWrapper,
    IncidentFilter,
  },

  props: {
    city: {
      type: String,
      default: '',
    },
  },

  computed: {
    showFilter() {
      console.log(this.$route.name)
      return this.$route.name === 'City-city' || this.$route.name === 'index'
    },
  },
}
</script>

<style scoped lang="postcss">
header {
  @mixin color-negative;

  position: sticky;
  top: 0;
  padding: 0.5em 0 2em;
  z-index: var(--z-header);
  border-bottom: 1px solid var(--color-white);
}

h1 {
  line-height: var(--line-height-header);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-header);
  font-size: 2rem;

  @media (--viewport-xs) {
    font-size: 2.25rem;
  }

  @media (--viewport-sm) {
    font-size: 3rem;
  }
}

h1 > a {
  box-shadow: none;
}

.leadin {
  font-size: 1.125em;
  line-height: 1;
}

.leadout {
  font-size: 0.875em;
  line-height: 1;
  text-transform: uppercase;
}
</style>
