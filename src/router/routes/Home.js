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
];

export default HomeRoutes;
