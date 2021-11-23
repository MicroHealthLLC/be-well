module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Well Being Prototype",
    themeColor: "#1d336f",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/service-worker.js",
      // ...other Workbox options...
    },
  },
};
