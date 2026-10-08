import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\CheckoutController::create
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::create
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::create
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::create
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::create
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::create
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CheckoutController::create
* @see app/Http/Controllers/Storefront/CheckoutController.php:27
* @route '/checkout'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

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

const CheckoutController = { create, store }

export default CheckoutController