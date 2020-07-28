<template>
  <select class="filter-select" aria-label="Filter by location" :value="city" @input="input">
    <option :value="''">FILTER BY LOCATION</option>
    <option v-for="option in options" :key="option.key" :value="option.value">
      {{ option.display }}
    </option>
  </select>
</template>

<script>
import { computed } from '@vue/composition-api'
import useIncidents from '@/use/incidents'

export default {
  setup() {
    const { list, total } = useIncidents()

    const options = computed(() => {
      const hist = new Map()
      list.value.forEach(({ city }) => {
        const n = hist.get(city) ?? 0
        hist.set(city, n + 1)
      })

      return [...hist.entries()]
        .map(([city, count]) => ({
          key: city,
          value: city,
          display: `${city} (${count})`,
          count,
        }))
        .sort((a, b) => {
          if (a.count !== b.count) {
            return b.count - a.count
          }
          if (a.value < b.value) {
            return -1
          }
          if (b.value < a.value) {
            return 1
          }
          return 0
        })
    })

    return { total, options }
  },

  computed: {
    city() {
      return this.$route.params.city
    },
  },
  methods: {
    input(e) {
      const city = e.target.value
      if (city === '') {
        this.$router.push({ name: 'Root' })
      } else {
        this.$router.push({ name: 'City', params: { city } })
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
select {
  position: absolute;
  margin-top: 1em;
  appearance: none;
  padding: 0.75em 4em 0.75em 1.5em;
  color: var(--color-primary);
  border-color: var(--color-primary);
  border-radius: 0.25em;
  border-width: 1px;
  /* stylelint-disable */
  background: #fff
    url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='20' height='20' xmlns='http://www.w3.org/2000/svg'><g><path stroke='black' stroke-width='4' d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z'/></g></svg>")
    no-repeat;
  background-position: right 0.75em top 50%;
}
</style>
