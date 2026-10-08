import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
const DiscountIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DiscountIndexController.url(options),
    method: 'get',
})

DiscountIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/discounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
DiscountIndexController.url = (options?: RouteQueryOptions) => {
    return DiscountIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
DiscountIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DiscountIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
DiscountIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: DiscountIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
const DiscountIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DiscountIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
DiscountIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DiscountIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
DiscountIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DiscountIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

DiscountIndexController.form = DiscountIndexControllerForm

export default DiscountIndexController