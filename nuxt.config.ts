// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    https: {
      key: './localhost-key.pem',
      cert: './localhost.pem'
    }
  },
  modules: [
    ['@storyblok/nuxt', { accessToken: process.env.NUXT_PUBLIC_STORYBLOK_TOKEN }],
    '@storyblok/nuxt',
  ],

})
