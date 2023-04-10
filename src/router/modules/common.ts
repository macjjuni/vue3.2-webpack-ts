const common = [
  {
    path: '/',
    name: 'Common',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/about',
        name: 'What to Eat?',
        component: () => import('@/views/common/WhatToEat/index.vue'),
      },
      {
        path: '/portfolio',
        name: 'Portfolio',
        component: () => import('@/views/common/Portfolio.vue'),
      },
      {
        path: '/Services',
        name: 'Service',
        component: () => import('@/views/common/Services.vue'),
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/common/Contact.vue'),
      },
    ],
  },
]

export default common
