import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
const DiscountStoreController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: DiscountStoreController.url(options),
    method: 'post',
})

DiscountStoreController.definition = {
    methods: ["post"],
    url: '/admin/discounts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
DiscountStoreController.url = (options?: RouteQueryOptions) => {
    return DiscountStoreController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
DiscountStoreController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: DiscountStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
const DiscountStoreControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: DiscountStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
DiscountStoreControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: DiscountStoreController.url(options),
    method: 'post',
})

DiscountStoreController.form = DiscountStoreControllerForm

export default DiscountStoreController