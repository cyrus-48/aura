import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Product\ProductEditController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductEditController.php:19
* @route '/admin/products/{product}/edit'
*/
const ProductEditController = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ProductEditController.url(args, options),
    method: 'get',
})

ProductEditController.definition = {
    methods: ["get","head"],
    url: '/admin/products/{product}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Product\ProductEditController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductEditController.php:19
* @route '/admin/products/{product}/edit'
*/
ProductEditController.url = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ProductEditController.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Product\ProductEditController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductEditController.php:19
* @route '/admin/products/{product}/edit'
*/
ProductEditController.get = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ProductEditController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductEditController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductEditController.php:19
* @route '/admin/products/{product}/edit'
*/
ProductEditController.head = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ProductEditController.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductEditController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductEditController.php:19
* @route '/admin/products/{product}/edit'
*/
const ProductEditControllerForm = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ProductEditController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductEditController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductEditController.php:19
* @route '/admin/products/{product}/edit'
*/
ProductEditControllerForm.get = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ProductEditController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Product\ProductEditController::__invoke
* @see app/Http/Controllers/Admin/Product/ProductEditController.php:19
* @route '/admin/products/{product}/edit'
*/
ProductEditControllerForm.head = (args: { product: number | { id: number } } | [product: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ProductEditController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ProductEditController.form = ProductEditControllerForm

export default ProductEditController