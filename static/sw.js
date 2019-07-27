importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/01dc8b1a39a8d5c46676.js",
    "revision": "dc2ecb9aa1949627e6facfd9f362f725"
  },
  {
    "url": "/_nuxt/06988891d1692729feee.js",
    "revision": "a3db660f8665ad8cd55532f38e20e025"
  },
  {
    "url": "/_nuxt/55e046b5546de332f9ff.js",
    "revision": "e94a4a7dbac162b0175f1decd829b87c"
  },
  {
    "url": "/_nuxt/5b0b257ab7e610e8d423.js",
    "revision": "99eae4439d628a58262cce833019db4c"
  },
  {
    "url": "/_nuxt/75efb79ee84bdb9c1781.js",
    "revision": "375f5d4eb28f5a5f77d63639458ac7d9"
  },
  {
    "url": "/_nuxt/7fce64bb69608e34bcf2.js",
    "revision": "d103a2c0dae9cb25bc6a4977f4bdb185"
  },
  {
    "url": "/_nuxt/876ce07076baedd3fd8d.js",
    "revision": "a1d3c62cff1c6d4852ebda28a9e3f6c9"
  },
  {
    "url": "/_nuxt/888db571094aec4ae1f9.js",
    "revision": "566358eae114a51c090fc4e51192ee91"
  },
  {
    "url": "/_nuxt/99e9e48069ebae7063ea.js",
    "revision": "40911489eeec48db9b3304ad757593b0"
  },
  {
    "url": "/_nuxt/9fbddab88ac0ece5c168.js",
    "revision": "e196c77afd96600b50c1f709a3993dda"
  },
  {
    "url": "/_nuxt/ba4a29286a1244f76b08.js",
    "revision": "519816a23a41cf9383fa62b23bff1a91"
  },
  {
    "url": "/_nuxt/c0fcd0d3944ec96d8f03.js",
    "revision": "47563ddccdfe3bd3f3b828e841622419"
  },
  {
    "url": "/_nuxt/cfbc6964051f7356c818.js",
    "revision": "144c393d3e83b64bb9fc3a911c532a32"
  },
  {
    "url": "/_nuxt/dc595a5ede79404b1e43.js",
    "revision": "b0a6c72fbfb6f5c14cc326c0e2ce766e"
  },
  {
    "url": "/_nuxt/f6b93a75b9a7553ed7d8.js",
    "revision": "03ac57d60f6b999d505ad16499573731"
  }
], {
  "cacheId": "GrabTheNudes",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
