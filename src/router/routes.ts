import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      {
        path: '',
        redirect: '/category',
      },
      {
        path: 'category',
        component: () => import('pages/CategoryPage.vue'),
        name: 'category',
      },
      {
        path: 'subcategory',
        component: () => import('pages/SubcategoryPage.vue'),
        name: 'subcategory',
      },
      {
        path: 'product',
        component: () => import('pages/product/ProductPage.vue'),
        name: 'product',
      },
      {
        path: 'product/:id',
        component: () => import('pages/product/ProductDetailsPage.vue'),
        name: 'product-details'
      },
      {
        path: 'product/create',
        component: () => import('pages/product/ProductCreatePage.vue'),
        name: 'product-create'
      },
      {
        path: 'order',
        component: () => import('pages/order/OrderPage.vue'),
        name: 'order'
      },
      {
        path: 'order/:id',
        component: () => import('pages/order/OrderDetailsPage.vue'),
        name: 'order-details'
      }
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue'), name: 'auth' }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
