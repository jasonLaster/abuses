module.exports = {
  pwa: {
    name: 'Police Abuses',
    themeColor: '#021e48',
    msTileColor: '#021e48',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    workboxPluginMode: 'InjectManifest',
    manifestOptions: {
      start_url: 'index.html',
    },
    workboxOptions: {
      swSrc: 'service-worker.js',
    },
  },
}
