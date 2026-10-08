import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\CheckoutController::index
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::index
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::index
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::index
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::index
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::index
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::index
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
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
* @see \App\Http\Controllers\Storefront\CheckoutController::store
* @see app/Http/Controllers/Storefront/CheckoutController.php:49
* @route '/checkout'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::store
* @see app/Http/Controllers/Storefront/CheckoutController.php:49
* @route '/checkout'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::store
* @see app/Http/Controllers/Storefront/CheckoutController.php:49
* @route '/checkout'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::store
* @see app/Http/Controllers/Storefront/CheckoutController.php:49
* @route '/checkout'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::store
* @see app/Http/Controllers/Storefront/CheckoutController.php:49
* @route '/checkout'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const checkout = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
}

export default checkout