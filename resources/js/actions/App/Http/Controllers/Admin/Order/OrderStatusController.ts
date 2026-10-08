import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Order\OrderStatusController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderStatusController.php:20
* @route '/admin/orders/{order}/status'
*/
const OrderStatusController = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: OrderStatusController.url(args, options),
    method: 'patch',
})

OrderStatusController.definition = {
    methods: ["patch"],
    url: '/admin/orders/{order}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\Order\OrderStatusController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderStatusController.php:20
* @route '/admin/orders/{order}/status'
*/
OrderStatusController.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return OrderStatusController.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Order\OrderStatusController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderStatusController.php:20
* @route '/admin/orders/{order}/status'
*/
OrderStatusController.patch = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: OrderStatusController.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderStatusController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderStatusController.php:20
* @route '/admin/orders/{order}/status'
*/
const OrderStatusControllerForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: OrderStatusController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderStatusController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderStatusController.php:20
* @route '/admin/orders/{order}/status'
*/
OrderStatusControllerForm.patch = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: OrderStatusController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

OrderStatusController.form = OrderStatusControllerForm

export default OrderStatusController