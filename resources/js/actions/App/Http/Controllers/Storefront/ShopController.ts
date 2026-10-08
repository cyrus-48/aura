import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\ShopController::__invoke
* @see app/Http/Controllers/Storefront/ShopController.php:20
* @route '/shop'
*/
const ShopController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ShopController.url(options),
    method: 'get',
})

ShopController.definition = {
    methods: ["get","head"],
    url: '/shop',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\ShopController::__invoke
* @see app/Http/Controllers/Storefront/ShopController.php:20
* @route '/shop'
*/
ShopController.url = (options?: RouteQueryOptions) => {
    return ShopController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\ShopController::__invoke
* @see app/Http/Controllers/Storefront/ShopController.php:20
* @route '/shop'
*/
ShopController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ShopController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ShopController::__invoke
* @see app/Http/Controllers/Storefront/ShopController.php:20
* @route '/shop'
*/
ShopController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ShopController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\ShopController::__invoke
* @see app/Http/Controllers/Storefront/ShopController.php:20
* @route '/shop'
*/
const ShopControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ShopController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ShopController::__invoke
* @see app/Http/Controllers/Storefront/ShopController.php:20
* @route '/shop'
*/
ShopControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ShopController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\ShopController::__invoke
* @see app/Http/Controllers/Storefront/ShopController.php:20
* @route '/shop'
*/
ShopControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ShopController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ShopController.form = ShopControllerForm

export default ShopController