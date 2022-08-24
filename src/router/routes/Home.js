import { lazy } from 'react';

const HomeRoutes = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('../../views/dashboard/')),
  },
  {
    path: '/chat',
    exact: true,
    component: lazy(() => import('../../views/apps/chat/')),
  },
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('../../views/login')),
    layout: 'BlankLayout',
  },
  {
    path: '/test1',
    exact: true,
    component: lazy(() => import('../../views/test1')),
  },
  {
    path: '/test2',
    exact: true,
    component: lazy(() => import('../../views/test2')),
  },
  {
    path: '/test3',
    exact: true,
    component: lazy(() => import('../../views/test3')),
  },
  {
    path: '/test4',
    exact: true,
    component: lazy(() => import('../../views/test4')),
  },
  {
    path: '/test5',
    exact: true,
    component: lazy(() => import('../../views/test5')),
  },
  {
    path: '/test6',
    exact: true,
    component: lazy(() => import('../../views/test6')),
  },
  {
    path: '/test7',
    exact: true,
    component: lazy(() => import('../../views/test7')),
  },
  {
    path: '/test8',
    exact: true,
    component: lazy(() => import('../../views/test8')),
  },
  {
    path: '/test9',
    exact: true,
    component: lazy(() => import('../../views/test9')),
  },
  {
    path: '/test10',
    exact: true,
    component: lazy(() => import('../../views/test10')),
  },
  {
    path: '/test11',
    exact: true,
    component: lazy(() => import('../../views/test11')),
  },
];

export default HomeRoutes;
