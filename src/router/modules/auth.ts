const auth = [
  {
    path: '/auth',
    children: [
      {
        path: '/auth/login',
        name: '로그인',
        component: () => import('@/views/auth/Login.vue'),
      },
    ],
  },
]

export default auth
