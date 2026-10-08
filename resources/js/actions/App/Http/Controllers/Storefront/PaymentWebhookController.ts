import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
const PaymentWebhookController = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: PaymentWebhookController.url(args, options),
    method: 'post',
})

PaymentWebhookController.definition = {
    methods: ["post"],
    url: '/webhooks/payments/{driver}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
PaymentWebhookController.url = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { driver: args }
    }

    if (Array.isArray(args)) {
        args = {
            driver: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        driver: args.driver,
    }

    return PaymentWebhookController.definition.url
            .replace('{driver}', parsedArgs.driver.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
PaymentWebhookController.post = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: PaymentWebhookController.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
const PaymentWebhookControllerForm = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: PaymentWebhookController.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
PaymentWebhookControllerForm.post = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: PaymentWebhookController.url(args, options),
    method: 'post',
})

PaymentWebhookController.form = PaymentWebhookControllerForm

export default PaymentWebhookController