import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Product\ProductCreateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductCreateController.php:18
* @route '/admin/products/create'
*/
const ProductCreateController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ProductCreateController.url(options),
    method: 'get',
})

ProductCreateController.definition = {
    methods: ["get","head"],
    url: '/admin/products/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Product\ProductCreateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductCreateController.php:18
* @route '/admin/products/create'
*/
ProductCreateController.url = (options?: RouteQueryOptions) => {
    return ProductCreateController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Product\ProductCreateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductCreateController.php:18
* @route '/admin/products/create'
*/
ProductCreateController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ProductCreateController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductCreateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductCreateController.php:18
* @route '/admin/products/create'
*/
ProductCreateController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ProductCreateController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductCreateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductCreateController.php:18
* @route '/admin/products/create'
*/
const ProductCreateControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ProductCreateController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductCreateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductCreateController.php:18
* @route '/admin/products/create'
*/
ProductCreateControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ProductCreateController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductCreateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductCreateController.php:18
* @route '/admin/products/create'
*/
ProductCreateControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ProductCreateController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ProductCreateController.form = ProductCreateControllerForm

export default ProductCreateController