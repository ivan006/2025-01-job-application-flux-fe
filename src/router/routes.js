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
          },
          {
            path: '/lists/tasks-tatuses',
            name: '/lists/tasks-tatuses',
            component: () => import('src/controllers/lists/tasks-tatuses/TaskstatusListController.vue'),
            meta: {
              breadcrumbName: 'Taskstatuses',
              breadcrumbParentName: '',
            },
          },
          {
            path: '/lists/tasks-tatuses/:rId/:rName',
            name: '/lists/tasks-tatuses/:rId/:rName',
            component: () => import('src/controllers/lists/tasks-tatuses/TaskstatusReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/tasks-tatuses',
            },
          },
          {
            path: '/lists/tasks',
            name: '/lists/tasks',
            component: () => import('src/controllers/lists/tasks/TaskListController.vue'),
            meta: {
              breadcrumbName: 'Tasks',
              breadcrumbParentName: '',
            },
          },
          {
            path: '/lists/tasks/:rId/:rName',
            name: '/lists/tasks/:rId/:rName',
            component: () => import('src/controllers/lists/tasks/TaskReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/tasks',
            },
          },
          {
            path: '/lists/todo-lists',
            name: '/lists/todo-lists',
            component: () => import('src/controllers/lists/todo-lists/TodoListListController.vue'),
            meta: {
              breadcrumbName: 'TodoLists',
              breadcrumbParentName: '',
            },
          },
          {
            path: '/lists/todo-lists/:rId/:rName',
            name: '/lists/todo-lists/:rId/:rName',
            component: () => import('src/controllers/lists/todo-lists/TodoListReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/todo-lists',
            },
          },
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
