import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import orders from './orders'
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

const account = {
    index: Object.assign(index, index),
    orders: Object.assign(orders, orders),
}

export default account