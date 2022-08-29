import { lazy } from 'react';

const HomeRoutes = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('../../views/login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/dash',
    exact: true,
    component: lazy(() => import('../../views/dashboard/')),
    meta: {
      action: 'defaultUser',
      resource: 'all',
    },
  },

  {
    path: '/list-files',
    exact: true,
    component: lazy(() => import('../../views/list-files/')),
  },
  {
    path: '/file-details/:hash',
    exact: true,
    component: lazy(() => import('../../views/file-details/')),
  },
  {
    path: '/validation-file',
    exact: true,
    component: lazy(() => import('../../views/validation-file/')),
  },
];

export default HomeRoutes;
