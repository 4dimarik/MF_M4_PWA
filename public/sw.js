self.addEventListener('install', (e) => {
  console.log('#### SW has been Installed');
});

self.addEventListener('activate', (e) => {
  console.log('#### SW has been activated');
});
