import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Product\ProductBulkController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductBulkController.php:17
* @route '/admin/products/bulk'
*/
const ProductBulkController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ProductBulkController.url(options),
    method: 'post',
})

ProductBulkController.definition = {
    methods: ["post"],
    url: '/admin/products/bulk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Product\ProductBulkController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductBulkController.php:17
* @route '/admin/products/bulk'
*/
ProductBulkController.url = (options?: RouteQueryOptions) => {
    return ProductBulkController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Product\ProductBulkController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductBulkController.php:17
* @route '/admin/products/bulk'
*/
ProductBulkController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ProductBulkController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductBulkController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductBulkController.php:17
* @route '/admin/products/bulk'
*/
const ProductBulkControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ProductBulkController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductBulkController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductBulkController.php:17
* @route '/admin/products/bulk'
*/
ProductBulkControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ProductBulkController.url(options),
    method: 'post',
})

ProductBulkController.form = ProductBulkControllerForm

export default ProductBulkController