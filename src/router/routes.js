const routes = [
  {
    path: '/',
    component: () => import('src/views/layouts/EmptyLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '/',
        component: () => import('src/views/layouts/MainLayout.vue'),
        redirect: to => { return '/about' },
        children: [
          {
            path: '/login',
            name: '/login',
            component: () => import('src/controllers/auth/SigninView.vue'),
            meta: { requiresAuth: false }
          },
          {
            path: '/register',
            name: '/register',
            component: () => import('src/controllers/auth/JoinView.vue'),
            meta: { requiresAuth: false }
          },
          {
            path: '/about',
            name: '/about',
            component: () => import('src/controllers/AboutController.vue'),
            meta: {
              breadcrumbName: 'About',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/users',
            name: '/lists/users',
            component: () => import('src/controllers/lists/users/UserListController.vue'),
            meta: {
              breadcrumbName: 'Users',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/users/:rId/:rName',
            name: '/lists/users/:rId/:rName',
            component: () => import('src/controllers/lists/users/UserReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/users',
              requiresAuth: false,
            },
          }
        ],
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/controllers/ErrorNotFound.vue'),
    meta: { requiresAuth: false }
  }
];

export default routes;
