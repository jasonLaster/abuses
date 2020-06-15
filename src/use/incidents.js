import { ref, computed } from '@vue/composition-api'
import incidents from '@/data/incidents.json'

export default () => {
  const list = ref(incidents.filter((incident) => incident.youtube.length))
  const total = computed(() => list.value.length)

  const getIncidentTitle = (incident) => {
    if (!incident) return ''
    return `Incident #${incident.id} — ${incident.city}, ${incident.state}`
  }

  const getIncidentByID = (ID) => {
    const currentIncident = list.value.find((incident) => incident.youtube === ID)
    return currentIncident || null
  }

  return {
    list,
    total,
    getIncidentTitle,
    getIncidentByID,
  }
}
