import incidents from './../data/incidents.json'

export default {
  fallback: true,
   routes() {
    const incidentsWithVideos = incidents.filter(incident => incident.youtube)
    return incidentsWithVideos.map(incident => `/incidents/${incident.youtube}`)
    },
}
