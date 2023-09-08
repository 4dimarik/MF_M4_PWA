const routes = {
  main: {
    path: '/',
  },
  categories: {
    path: ':category',
    nav: {
      name: 'main',
      variations: {
        character: { path: '/character', label: 'Герои' },
        episode: { path: '/episode', label: 'Эпизоды' },
        location: { path: '/location', label: 'Локации' },
      },
    },
  },
};

export { routes };
