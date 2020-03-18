import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          title: 'Yoshino-s Blog',
          right: 'theme'
        }
      },
    ],
    
  }, {
    path: '/about',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/About.vue'),
        meta: {
          title: 'Yoshino-s Blog',
          left: 'back',
          right: 'theme'
        }
      },
    ],
    
  }, {
    path: '/account/',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/account/Login.vue'),
        meta: {
          title: '登录',
          left: 'home',
          right: 'back'
        }
      }, {
        path: 'register',
        component: () => import('pages/account/Peach.vue'),
        meta: {
          title: '注册',
          left: 'home',
          right: 'back'
        }
      }
    ]
  }, {
    path: '/content/',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: 'create',
        component: () => import('pages/content/Create.vue'),
        meta: {
          title: '创建',
          left: 'home',
          right: 'back'
        }
      }
    ]
  }, {
    path: '/paragraph/',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: ':id',
        component: () => import('pages/paragraph/Show.vue'),
        meta: {
          title: 'Yoshino-s Blog',
          left: 'home',
          right: 'theme'
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
