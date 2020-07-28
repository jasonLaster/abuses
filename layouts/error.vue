<template>
  <app-page :page="page" />
</template>

<script>
import AppPage from '~/components/Layout/AppPage.vue'

export default {
  components: {
    AppPage,
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },

  computed: {
    page() {
      return {
        title: this.title,
        content: this.error.message,
      }
    },
    title() {
      if (this.error.statusCode === 404) {
        return this.$t('title404')
      }
      return this.$t('title500')
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>

<i18n>
{
  "nl": {
    "title404": "Pagina niet gevonden",
    "title500": "Er is een fout opgetreden"
  },
  "de": {
    "title404": "Seite nicht gefunden",
    "title500": "Ein Fehler ist aufgetreten"
  },
  "en": {
    "title404": "Page not found",
    "title500": "An error occured"
  }
}
</i18n>
