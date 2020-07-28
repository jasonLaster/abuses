<template>
  <div v-if="incident != null">
    <center-wrapper>
      <btn-back :to="{ name: 'index' }" title="Back to the list" />
      <incident-details :incident="incident" />
    </center-wrapper>
    <incidents-list :incidents="incidents" :title="listTitle" />
  </div>
  <not-found v-else noun="incident" />
</template>

<script>
import useIncidents from '~/use/incidents'
import NotFound from '~/components/Shared/NotFound.vue'
import IncidentDetails from '~/components/IncidentDetails/IncidentDetails.vue'
import CenterWrapper from '~/components/Layout/CenterWrapper.vue'
import BtnBack from '~/components/Shared/BtnBack.vue'
import IncidentsList from '~/components/IncidentsList/IncidentsList.vue'
import getSeoMetaData from '~/helpers/seo'

// temp fix while we're not using https://kazupon.github.io/vue-i18n/
const pluralize = (n, singular, plural) => {
  return `${n === 1 ? singular : plural}`
}

export default {
  setup() {
    const { getIncidentByID, getFilteredList } = useIncidents()
    return { getIncidentByID, getFilteredList }
  },
  components: {
    BtnBack,
    IncidentDetails,
    CenterWrapper,
    IncidentsList,
    NotFound,
  },

  computed: {
    listTitle() {
      return this.incident != null
        ? `Showing
      ${this.incidents.length}
      other
      ${pluralize(this.incidents.length, 'incident', 'incidents')}
      in
      ${this.incident.city}`
        : ''
    },
    incidents() {
      return this.incident != null ? this.getFilteredList(this.incident.city, this.incident.id) : []
    },
    incident() {
      const { id } = this.$route.params
      return this.getIncidentByID(id)
    },
  },

  head() {
    return getSeoMetaData({
      title: `Incident #${this.incident.id}`,
      text: this.incident.text,
      image: `https://img.youtube.com/vi/${this.incident.youtube}/hqdefault.jpg`,
      url: `${process.env.VUE_APP_BASE_URL}${this.$route.path}`,
    })
  },
}
</script>
