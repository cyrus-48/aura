import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Product\ProductStoreController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductStoreController.php:17
* @route '/admin/products'
*/
const ProductStoreController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ProductStoreController.url(options),
    method: 'post',
})

ProductStoreController.definition = {
    methods: ["post"],
    url: '/admin/products',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Product\ProductStoreController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductStoreController.php:17
* @route '/admin/products'
*/
ProductStoreController.url = (options?: RouteQueryOptions) => {
    return ProductStoreController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Product\ProductStoreController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductStoreController.php:17
* @route '/admin/products'
*/
ProductStoreController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ProductStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductStoreController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductStoreController.php:17
* @route '/admin/products'
*/
const ProductStoreControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ProductStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductStoreController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductStoreController.php:17
* @route '/admin/products'
*/
ProductStoreControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ProductStoreController.url(options),
    method: 'post',
})

ProductStoreController.form = ProductStoreControllerForm

export default ProductStoreController