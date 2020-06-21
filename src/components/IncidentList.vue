<template>
  <center-wrapper>
    <div :class="$style['filter-description']">
      Showing {{ pluralize(filteredList.length, 'incident', 'incidents') }} in
      {{ selectedCityName }}
    </div>

    <ul :class="$style.list">
      <incident-list-item
        v-for="incident in filteredList"
        :key="incident.id"
        :incident="incident"
      />
    </ul>
  </center-wrapper>
</template>

<script>
import { computed } from '@vue/composition-api'

import IncidentListItem from '@/components/IncidentListItem.vue'
import CenterWrapper from '@/components/CenterWrapper.vue'
import useIncidents from '@/use/incidents'

function pluralize(n, singular, plural) {
  return `${n} ${n === 1 ? singular : plural}`
}

export default {
  components: {
    IncidentListItem,
    CenterWrapper,
  },

  props: {
    city: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { list } = useIncidents()

    const selectedCityName = computed(() => {
      return props.city === '' ? 'all cities' : props.city
    })

    const filteredList = computed(() =>
      list.value.filter((i) => props.city === '' || i.city === props.city),
    )

    return { filteredList, selectedCityName, pluralize }
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
  text-align: center;
  margin-bottom: 1em;
  font-size: 1.125em;
}
</style>
