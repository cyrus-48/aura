import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::confirmation
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
export const confirmation = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(args, options),
    method: 'get',
})

confirmation.definition = {
    methods: ["get","head"],
    url: '/orders/{order}/confirmation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::confirmation
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
confirmation.url = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions) => {
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

    return confirmation.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::confirmation
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
confirmation.get = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::confirmation
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
confirmation.head = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::confirmation
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
const confirmationForm = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::confirmation
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
confirmationForm.get = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\OrderConfirmationController::confirmation
* @see app/Http/Controllers/Storefront/OrderConfirmationController.php:18
* @route '/orders/{order}/confirmation'
*/
confirmationForm.head = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

confirmation.form = confirmationForm

const orders = {
    confirmation: Object.assign(confirmation, confirmation),
}

export default orders