<template>
  <div>
    <div :class="$style['filter-description']">
      {{ title }}
    </div>
    <ul v-if="filteredList.length" :class="$style.list">
      <incident-list-item
        v-for="incident in filteredList"
        :key="incident.id"
        :incident="incident"
      />
    </ul>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

import IncidentListItem from '@/components/IncidentListItem.vue'
import useIncidents from '@/use/incidents'

export default {
  components: {
    IncidentListItem,
  },

  props: {
    city: {
      type: String,
      default: '',
    },
    excludeId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    title() {
      return `Showing
      ${this.filteredList.length}
      ${this.excludeId ? 'other' : ''}
      ${this.pluralize(this.filteredList.length, 'incident', 'incidents')}
      in
      ${this.selectedCityName}`
    },
  },

  setup(props) {
    const { list } = useIncidents()

    const selectedCityName = computed(() => {
      return props.city === '' ? 'all cities' : props.city
    })

    const filteredList = computed(() =>
      list.value.filter(
        (i) => (props.city === '' || i.city === props.city) && i.id !== props.excludeId,
      ),
    )

    return { filteredList, selectedCityName }
  },
  methods: {
    pluralize(n, singular, plural) {
      return `${n === 1 ? singular : plural}`
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
  font-size: 1.125em;
}
</style>
