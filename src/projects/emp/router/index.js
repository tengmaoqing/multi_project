import InstalledRouter from '@/system/init/init-router';
const Index = () => import('../views/index/index');
const Map = () => import('../views/map/index');
const D404 = () => import('@/core/404/index');

export function createRouter () {
  return new InstalledRouter({
    base: 'emp',
    mode: 'hash',
    routes: [
      {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
          title: 'title'
        }
      },

      {
        path: '/map',
        name: 'Map',
        component: Map,
        meta: {
          title: 'title'
        }
      },

      {
        path: '*',
        name: '404',
        component: D404,
        meta: {
          title: 'title'
        }
      }
    ]
  });
};
