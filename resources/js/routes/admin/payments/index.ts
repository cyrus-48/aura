import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const payments = {
    index: Object.assign(index, index),
}

export default payments