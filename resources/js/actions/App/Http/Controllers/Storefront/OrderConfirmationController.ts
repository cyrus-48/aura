import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::show
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
export const show = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/orders/{order}/confirmation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::show
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
show.url = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'order_number' in args) {
        args = { order: args.order_number }
    }

    if (Array.isArray(args)) {
        args = {
            order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.order_number
        : args.order,
    }

    return show.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::show
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
show.get = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::show
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
show.head = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::show
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
const showForm = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::show
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
showForm.get = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::show
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
showForm.head = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const OrderConfirmationController = { show }

export default OrderConfirmationController