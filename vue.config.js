module.exports = {
  pwa: {
    name: 'Police Abuses',
    start_url: 'https://deploy-preview-10--police-accountability.netlify.app/',
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
