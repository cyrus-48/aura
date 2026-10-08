import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Product\ProductDuplicateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDuplicateController.php:17
* @route '/admin/products/{product}/duplicate'
*/
const ProductDuplicateController = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ProductDuplicateController.url(args, options),
    method: 'post',
})

ProductDuplicateController.definition = {
    methods: ["post"],
    url: '/admin/products/{product}/duplicate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Product\ProductDuplicateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDuplicateController.php:17
* @route '/admin/products/{product}/duplicate'
*/
ProductDuplicateController.url = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        product: typeof args.product === 'object'
        ? args.product.id
        : args.product,
    }

    return ProductDuplicateController.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Product\ProductDuplicateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDuplicateController.php:17
* @route '/admin/products/{product}/duplicate'
*/
ProductDuplicateController.post = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ProductDuplicateController.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductDuplicateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDuplicateController.php:17
* @route '/admin/products/{product}/duplicate'
*/
const ProductDuplicateControllerForm = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ProductDuplicateController.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductDuplicateController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDuplicateController.php:17
* @route '/admin/products/{product}/duplicate'
*/
ProductDuplicateControllerForm.post = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ProductDuplicateController.url(args, options),
    method: 'post',
})

ProductDuplicateController.form = ProductDuplicateControllerForm

export default ProductDuplicateController