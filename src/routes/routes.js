const routers = [
    {
        path: '/',
        redirect: '/crud/create'
    },
    {
        component: 'MainLayout',
        path: '/crud',
        auth: false,
        exact: false,
        childrens: [
            {
                component: 'CrudForm',
                path: '/create',
                auth: false,
                exact: true
            }
        ]
    }
]

export default routers 