import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\AccountController::index
* @see app/Http/Controllers/Storefront/AccountController.php:25
* @route '/account'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/account',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\AccountController::index
* @see app/Http/Controllers/Storefront/AccountController.php:25
* @route '/account'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\AccountController::index
* @see app/Http/Controllers/Storefront/AccountController.php:25
* @route '/account'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\AccountController::index
* @see app/Http/Controllers/Storefront/AccountController.php:25
* @route '/account'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\AccountController::index
* @see app/Http/Controllers/Storefront/AccountController.php:25
* @route '/account'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\AccountController::index
* @see app/Http/Controllers/Storefront/AccountController.php:25
* @route '/account'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\AccountController::index
* @see app/Http/Controllers/Storefront/AccountController.php:25
* @route '/account'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Storefront\AccountController::cancelOrder
* @see app/Http/Controllers/Storefront/AccountController.php:44
* @route '/account/orders/{order}/cancel'
*/
export const cancelOrder = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelOrder.url(args, options),
    method: 'post',
})

cancelOrder.definition = {
    methods: ["post"],
    url: '/account/orders/{order}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Storefront\AccountController::cancelOrder
* @see app/Http/Controllers/Storefront/AccountController.php:44
* @route '/account/orders/{order}/cancel'
*/
cancelOrder.url = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions) => {
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

    return cancelOrder.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\AccountController::cancelOrder
* @see app/Http/Controllers/Storefront/AccountController.php:44
* @route '/account/orders/{order}/cancel'
*/
cancelOrder.post = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelOrder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\AccountController::cancelOrder
* @see app/Http/Controllers/Storefront/AccountController.php:44
* @route '/account/orders/{order}/cancel'
*/
const cancelOrderForm = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancelOrder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\AccountController::cancelOrder
* @see app/Http/Controllers/Storefront/AccountController.php:44
* @route '/account/orders/{order}/cancel'
*/
cancelOrderForm.post = (args: { order: string | { order_number: string } } | [order: string | { order_number: string } ] | string | { order_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancelOrder.url(args, options),
    method: 'post',
})

cancelOrder.form = cancelOrderForm

const AccountController = { index, cancelOrder }

export default AccountController