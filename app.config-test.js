/**
 * @param {import('expo/config').ConfigContext} config
 * @returns {import('expo/config').ExpoConfig}
 */
export default ({ config }) => {
  const environment = process.env.APP_ENV

  return {
    ...config,
    extra: {
      ...config.extra,
      appEnv: environment,
      apiUrlIOS: process.env.API_URL_IOS,
      apiUrlAndroid: process.env.API_URL_ANDROID,
    },
    ios: {
      ...config.ios,
    },
    android: {
      ...config.android,
    },
    plugins: [...config.plugins],
  }
}
