import InstalledRouter from '@/system/init/init-router';
const Index = () => import('../views/index/index');
const Map = () => import('../views/map/index');
const Login = () => import('../views/login/index');
const Rigister = () => import('../views/rigister/index');
const Service = () => import('../views/service/index');
const FindPWD = () => import('../views/findpwd/index');
const rigisterNewState = () => import('../views/registenewstate/index');
const newCustomer = () => import('../views/newCustomer/index');
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
          title: '首页',
          navshow: true
        }
      },

      {
        path: '/rigister',
        name: 'Rigister',
        component: Rigister,
        meta: {
          title: '注册',
          header: '注册'
        }
      },

      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          title: '登录'
        }
      },
      {
        path: '/service',
        name: 'Service',
        component: Service,
        meta: {
          title: '服务协议',
          header: '服务协议'
        }
      },
      {
        path: '/findpwd',
        name: 'FindPWD',
        component: FindPWD,
        meta: {
          title: '找回密码',
          header: '找回密码'
        }
      },
      {
        path: '/rigisterNewState',
        name: 'rigisterNewState',
        component: rigisterNewState,
        meta: {
          title: '新盘报备',
          header: '新盘报备'
        }
      },
      {
        path: '/newCustomer',
        name: 'newCustomer',
        component: newCustomer,
        meta: {
          title: '报备客户',
          header: '报备客户'
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
