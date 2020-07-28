import { baseUrl } from './../data/siteDetails'

const numberFormats = {
  currency: {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'symbol',
  },
}

const dateTimeFormats = {
  short: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  day: {
    weekday: 'short',
  },
}

export default {
  defaultLocale: 'de',
  fallbackLocale: 'de',
  rootRedirect: 'de',
  baseUrl,
  lazy: true,
  seo: true,
  strategy: 'prefix',
  langDir: 'locales/',
  locales: [
    {
      name: 'Deutsch',
      code: 'de',
      iso: 'de',
      file: 'de.json',
    },
    {
      name: 'Nederlands',
      code: 'nl',
      iso: 'nl',
      file: 'nl.json',
    },
    {
      name: 'English',
      code: 'en',
      iso: 'en',
      file: 'en.json',
    },
  ],
  vueI18nLoader: true,
  vueI18n: {
    silentFallbackWarn: true,
    numberFormats: {
      nl: {
        currency: numberFormats.currency,
      },
      en: {
        currency: numberFormats.currency,
      },
      de: {
        currency: numberFormats.currency,
      },
    },
    dateTimeFormats: {
      nl: {
        short: dateTimeFormats.short,
        day: dateTimeFormats.day,
      },
      en: {
        short: dateTimeFormats.short,
        day: dateTimeFormats.day,
      },
      de: {
        short: dateTimeFormats.short,
        day: dateTimeFormats.day,
      },
    },
  },
}
