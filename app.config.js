export default {
  expo: {
    name: 'MyApp',
    slug: 'my-app',
    newArchEnabled: true,
    extra: {
      apiUrlIOS: process.env.API_URL_IOS,
      apiUrlAndroid: process.env.API_URL_ANDROID,
      env: process.env.ENV,
    },
  },
}
