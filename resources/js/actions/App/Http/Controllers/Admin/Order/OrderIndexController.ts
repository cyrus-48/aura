import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Order\OrderIndexController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderIndexController.php:21
* @route '/admin/orders'
*/
const OrderIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: OrderIndexController.url(options),
    method: 'get',
})

OrderIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Order\OrderIndexController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderIndexController.php:21
* @route '/admin/orders'
*/
OrderIndexController.url = (options?: RouteQueryOptions) => {
    return OrderIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Order\OrderIndexController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderIndexController.php:21
* @route '/admin/orders'
*/
OrderIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: OrderIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderIndexController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderIndexController.php:21
* @route '/admin/orders'
*/
OrderIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: OrderIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderIndexController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderIndexController.php:21
* @route '/admin/orders'
*/
const OrderIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: OrderIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderIndexController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderIndexController.php:21
* @route '/admin/orders'
*/
OrderIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: OrderIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderIndexController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderIndexController.php:21
* @route '/admin/orders'
*/
OrderIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: OrderIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

OrderIndexController.form = OrderIndexControllerForm

export default OrderIndexController