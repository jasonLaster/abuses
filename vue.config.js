module.exports = {
  pwa: {
    name: 'Police Abuses',
    themeColor: '#021E48',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
    },
  },
}
