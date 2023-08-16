import { routes } from '../../../configs/routes';

const addLinks = (links, data) => {
  if (data.link) {
    return links.push(data.link);
  }
  if (data.variations) {
    return [...links, ...Object.values(data.variations)];
  }
};

const getHeaderLinks = (name) => {
  return Object.values(routes).reduce((links, route) => {
    if (route?.nav?.name === name) {
      return addLinks(links, route.nav);
    }
    return links;
  }, []);
};

export { getHeaderLinks };
