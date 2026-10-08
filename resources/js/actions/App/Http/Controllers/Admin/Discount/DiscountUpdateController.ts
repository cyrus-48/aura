import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
const DiscountUpdateController = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: DiscountUpdateController.url(args, options),
    method: 'put',
})

DiscountUpdateController.definition = {
    methods: ["put"],
    url: '/admin/discounts/{discount}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
DiscountUpdateController.url = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return DiscountUpdateController.definition.url
            .replace('{discount}', parsedArgs.discount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
DiscountUpdateController.put = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: DiscountUpdateController.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
const DiscountUpdateControllerForm = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: DiscountUpdateController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
DiscountUpdateControllerForm.put = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: DiscountUpdateController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

DiscountUpdateController.form = DiscountUpdateControllerForm

export default DiscountUpdateController