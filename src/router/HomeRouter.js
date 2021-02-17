export default {
	path: '/home',
	component: () => import('views/home/Home'),
	redirect: '/welcome',
	children: [{
			path: '/welcome',
			component: () => import('views/home/Welcome')
		},
		{
			path: '/users',
			component: () => import('views/users/User')
		},
		{
			path: '/roles',
			component: () => import('views/power/Roles')
		},
		{
			path: '/rights',
			component: () => import('views/power/Rights')
		},
		{
			path: '/goods',
			component: () => import('views/goods/Goods')
		},
		{
			path: '/params',
			component: () => import('views/goods/Params')
		},
		{
			path: '/categories',
			component: () => import('views/goods/Categories')
		},
		{
			path: '/orders',
			component: () => import('views/order/Orders')
		},
		{
			path: '/reports',
			component: () => import('views/data/Reports')
		}
	]
}
