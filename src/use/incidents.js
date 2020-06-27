import { ref, computed } from '@vue/composition-api'
import incidents from '@/data/incidents.json'

export default () => {
  const list = ref(incidents.filter((incident) => incident.youtube != null))
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
