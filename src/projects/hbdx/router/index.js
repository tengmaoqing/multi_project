import Vue from 'vue';
import Router from 'vue-router';

const Welcome = () => import('../components/welcome/welcome');
const Products = () => import('../components/models/models');
const Login = () => import('../components/login/index');
const OrderItem = () => import('../components/order/order');
const OrderResult = () => import('../components/order-result/index');
const Orders = () => import('../components/orders/orders');

const ProductInfo = () => import('../components/inquery/inquery');
const EvInfo = () => import('../components/inquery-info/inquery-info');
// const InitOrder = () => import('../components/init-order/init-order');
const Search = () => import('../components/search/search');
const D404 = () => import('@/core/404/index');

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/search',
        name: 'search',
        component: Search,
        meta: {
          index: 1,
          hideCrumb: false,
          requiresAuth: true
        }
      },
      {
        path: '/',
        name: 'welcome',
        component: Welcome,
        meta: {
          requiresAuth: true,
          hideCrumb: true,
          title: 'title'
        }
      },
      {
        path: '/products',
        name: 'Products',
        component: Products,
        meta: {
          index: 1,
          requiresAuth: true,
          title: 'title'
        }
      },
      {
        path: '/productInfo/:productId',
        name: 'ProductInfo',
        component: ProductInfo,
        meta: {
          index: 2,
          requiresAuth: true,
          title: 'title'
        }
      },
      {
        path: '/evInfo/:evID',
        name: 'EvInfo',
        component: EvInfo,
        meta: {
          index: 3,
          requiresAuth: true,
          title: 'title'
        }
      },
      // {
      //   path: '/initOrder/:evID',
      //   name: 'InitOrder',
      //   component: InitOrder,
      //   meta: {
      //     requiresAuth: true,
      //     title: 'title'
      //   }
      // },
      {
        path: '/orderResult/:orderNum',
        name: 'OrderResult',
        component: OrderResult,
        meta: {
          index: 4,
          requiresAuth: true,
          title: 'title'
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          hideHeader: true,
          hideCrumb: true,
          title: 'title'
        }
      },
      {
        path: '/order/:orderId',
        name: 'OrderItem',
        component: OrderItem,
        meta: {
          requiresAuth: true,
          title: 'title'
        }
      },
      {
        path: '/orders',
        name: 'Orders',
        component: Orders,
        meta: {
          requiresAuth: true,
          hideCrumb: true,
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
