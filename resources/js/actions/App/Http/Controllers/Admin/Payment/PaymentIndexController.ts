import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
const PaymentIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PaymentIndexController.url(options),
    method: 'get',
})

PaymentIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
PaymentIndexController.url = (options?: RouteQueryOptions) => {
    return PaymentIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
PaymentIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PaymentIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
PaymentIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PaymentIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
const PaymentIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: PaymentIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
PaymentIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: PaymentIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Payment\PaymentIndexController::__invoke
* @see app/Http/Controllers/Admin/Payment/PaymentIndexController.php:19
* @route '/admin/payments'
*/
PaymentIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: PaymentIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

PaymentIndexController.form = PaymentIndexControllerForm

export default PaymentIndexController