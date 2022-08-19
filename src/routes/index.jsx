import { lazy, createElement } from 'react'

const routes = [
  {
    path: '/*',
    element: createElement(lazy(() => import('../_layouts'))),
    children: [
      { index: true, element: createElement(lazy(() => import('../todos'))) },
      {
        path: 'todo-list',
        index: true,
        element: createElement(lazy(() => import('../todos'))),
      },
      {
        path: 'todo-items',
        index: true,
        element: createElement(lazy(() => import('../items'))),
      },
      // 404
      {
        path: '*',
        index: true,
        element: createElement(lazy(() => import('../_layouts/pageNotFound'))),
      },
    ],
  },
]

export default routes
