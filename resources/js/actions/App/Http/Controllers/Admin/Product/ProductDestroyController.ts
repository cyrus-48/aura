import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Product\ProductDestroyController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDestroyController.php:16
* @route '/admin/products/{product}'
*/
const ProductDestroyController = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: ProductDestroyController.url(args, options),
    method: 'delete',
})

ProductDestroyController.definition = {
    methods: ["delete"],
    url: '/admin/products/{product}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\Product\ProductDestroyController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDestroyController.php:16
* @route '/admin/products/{product}'
*/
ProductDestroyController.url = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ProductDestroyController.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Product\ProductDestroyController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDestroyController.php:16
* @route '/admin/products/{product}'
*/
ProductDestroyController.delete = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: ProductDestroyController.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductDestroyController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDestroyController.php:16
* @route '/admin/products/{product}'
*/
const ProductDestroyControllerForm = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ProductDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductDestroyController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductDestroyController.php:16
* @route '/admin/products/{product}'
*/
ProductDestroyControllerForm.delete = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ProductDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

ProductDestroyController.form = ProductDestroyControllerForm

export default ProductDestroyController