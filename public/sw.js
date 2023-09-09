const staticCacheName = 'static-site-v3';
const dynamicCacheName = 'dynamic-site-v3';

const ASSETS = [
  '/',
  '/assets/icons/favicon-32x32.png',
  '/assets/Rick-And-Morty-Logo.png',
  '/assets/icons/android-chrome-192x192.png',
  '/manifest.webmanifest',
  '/sw.js',
  '/app.js',
];

self.addEventListener('install', async (e) => {
  const cache = await caches.open(staticCacheName);
  try {
    await cache.addAll(ASSETS);
  } catch (error) {
    console.error('####: staticCache', error);
  }
});

self.addEventListener('activate', async (e) => {
  const cachesKeysArr = await caches.keys();
  await Promise.all(
    cachesKeysArr
      .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
      .map((key) => caches.delete(key))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(cacheFirst(e.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  try {
    return (
      cached ??
      (await fetch(request).then((response) => {
        return networkFirst(request);
      }))
    );
  } catch (error) {
    return networkFirst(request);
  }
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached ?? (await cached.match('/404'));
  }
}
