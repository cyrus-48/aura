import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Order\OrderDetailController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderDetailController.php:18
* @route '/admin/orders/{order}'
*/
const OrderDetailController = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: OrderDetailController.url(args, options),
    method: 'get',
})

OrderDetailController.definition = {
    methods: ["get","head"],
    url: '/admin/orders/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Order\OrderDetailController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderDetailController.php:18
* @route '/admin/orders/{order}'
*/
OrderDetailController.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return OrderDetailController.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Order\OrderDetailController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderDetailController.php:18
* @route '/admin/orders/{order}'
*/
OrderDetailController.get = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: OrderDetailController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderDetailController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderDetailController.php:18
* @route '/admin/orders/{order}'
*/
OrderDetailController.head = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: OrderDetailController.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderDetailController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderDetailController.php:18
* @route '/admin/orders/{order}'
*/
const OrderDetailControllerForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: OrderDetailController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderDetailController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderDetailController.php:18
* @route '/admin/orders/{order}'
*/
OrderDetailControllerForm.get = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: OrderDetailController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderDetailController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderDetailController.php:18
* @route '/admin/orders/{order}'
*/
OrderDetailControllerForm.head = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: OrderDetailController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

OrderDetailController.form = OrderDetailControllerForm

export default OrderDetailController