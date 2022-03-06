module.exports = {
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/serviceWorker.js",
      swDest: "service-worker.js"
    }
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "pl",
      localeDir: "locales",
      enableInSFC: true,
      enableBridge: false
    }
  }
}
