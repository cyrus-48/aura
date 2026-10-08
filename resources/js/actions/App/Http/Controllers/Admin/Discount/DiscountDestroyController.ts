import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
const DiscountDestroyController = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: DiscountDestroyController.url(args, options),
    method: 'delete',
})

DiscountDestroyController.definition = {
    methods: ["delete"],
    url: '/admin/discounts/{discount}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
DiscountDestroyController.url = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { discount: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { discount: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            discount: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        discount: typeof args.discount === 'object'
        ? args.discount.id
        : args.discount,
    }

    return DiscountDestroyController.definition.url
            .replace('{discount}', parsedArgs.discount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
DiscountDestroyController.delete = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: DiscountDestroyController.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
const DiscountDestroyControllerForm = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: DiscountDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
DiscountDestroyControllerForm.delete = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: DiscountDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

DiscountDestroyController.form = DiscountDestroyControllerForm

export default DiscountDestroyController