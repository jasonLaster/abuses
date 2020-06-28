import { ref, computed } from '@vue/composition-api'
import incidents from '@/data/incidents.json'

const FUTURE = '2999-12-31' // Philip J. Fry's thawing out day

export default () => {
  const list = ref(
    incidents
      .filter((incident) => incident.youtube != null)
      .sort((a, b) => {
        // assume incidents with missing datetimes are newest
        const adt = a.tweetDateTime ?? FUTURE
        const bdt = b.tweetDateTime ?? FUTURE

        if (adt === bdt) {
          // when dates are missing, show newest GCD number first
          return parseFloat(b.id) - parseFloat(a.id)
        }
        if (bdt < adt) {
          return -1
        }
        return 1
      }),
  )
  const total = computed(() => list.value.length)

  const getIncidentByID = (ID) => {
    const currentIncident = list.value.find((incident) => incident.youtube === ID)
    return currentIncident || null
  }

  const getFilteredList = (city, excludeId) =>
    list.value.filter(
      (incident) => (city === '' || incident.city === city) && incident.id !== excludeId,
    )

  return {
    list,
    total,
    getIncidentByID,
    getFilteredList,
  }
}
