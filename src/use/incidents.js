import { reactive, computed } from '@vue/composition-api'
import incidents from '@/data/incidents.json'

export default () => {
  const state = reactive({
    list: incidents.filter((incident) => incident.youtube.length),
    total: computed(() => state.list.length),
  })

  const getIncidentTitle = (incident) => {
    if (incident) {
      return `Incident #${incident.id} — ${incident.city}, ${incident.state}`
    }
    return ''
  }

  const getIncidentByID = (ID) => {
    const { list } = state
    const currentIncident = list.find((incident) => incident.youtube === ID)
    if (currentIncident) {
      return currentIncident
    }
    return null
  }

  return {
    state,
    getIncidentTitle,
    getIncidentByID,
  }
}
