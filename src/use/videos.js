import { reactive, computed } from '@vue/composition-api'
import incidents from '@/data/incidents.json'

export default () => {
  const state = reactive({
    list: incidents.filter((video) => video.youtube.length),
    total: computed(() => state.list.length),
  })

  const getVideoTitle = (video) => {
    if (video) {
      return `Incident #${video.id} — ${video.city}, ${video.state}`
    }
    return ''
  }

  const getVideoByID = (ID) => {
    const { list } = state
    const currentVideo = list.find((video) => video.youtube === ID)
    if (currentVideo) {
      return currentVideo
    }
    return null
  }

  return {
    state,
    getVideoTitle,
    getVideoByID,
  }
}
