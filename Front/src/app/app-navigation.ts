export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Administrar',
    icon: 'folder',
    items: [
      {
        text: 'Clientes',
        path: '/clientes'
      },
      {
        text: 'Produtos',
        path: '/produtos'
      },
      {
        text: 'Notas',
        path: '/notas'
      }
    ]
  }
];
