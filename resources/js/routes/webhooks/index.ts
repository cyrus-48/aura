import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
export const payments = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payments.url(args, options),
    method: 'post',
})

payments.definition = {
    methods: ["post"],
    url: '/webhooks/payments/{driver}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
payments.url = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return payments.definition.url
            .replace('{driver}', parsedArgs.driver.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
payments.post = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payments.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
const paymentsForm = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payments.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Storefront\PaymentWebhookController::__invoke
* @see app/Http/Controllers/Storefront/PaymentWebhookController.php:17
* @route '/webhooks/payments/{driver}'
*/
paymentsForm.post = (args: { driver: string | number } | [driver: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payments.url(args, options),
    method: 'post',
})

payments.form = paymentsForm

const webhooks = {
    payments: Object.assign(payments, payments),
}

export default webhooks