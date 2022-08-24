import { lazy } from 'react';

const HomeRoutes = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('../../views/dashboard/')),
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
