const staticCacheName = 'static-site';

const ASSETS = [
  '/',
  '/index.html',
  '/assets/icons/favicon-32x32.png',
  '/assets/Rick-And-Morty-Logo.png',
  '/assets/icons/android-chrome-192x192.png',
  '/sw.js',
  '/app.js',
];

self.addEventListener('install', async (e) => {
  console.log('#### SW has been Installed');
  const cache = await caches.open(staticCacheName);
  console.log('####: caches add ASSETS');
  await cache.addAll(ASSETS);
});

self.addEventListener('activate', (e) => {
  console.log('#### SW has been activated');
});

self.addEventListener('fetch', (e) => {
  console.log('#### fetch', e.request.url);
});
