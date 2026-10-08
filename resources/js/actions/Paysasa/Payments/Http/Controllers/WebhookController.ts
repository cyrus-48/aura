import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Paysasa\Payments\Http\Controllers\WebhookController::handle
* @see vendor/cyrus-48/paysasa/src/Http/Controllers/WebhookController.php:37
* @route '/paysasa/webhooks/{provider}'
*/
export const handle = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handle.url(args, options),
    method: 'get',
})

handle.definition = {
    methods: ["get","post","head"],
    url: '/paysasa/webhooks/{provider}',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \Paysasa\Payments\Http\Controllers\WebhookController::handle
* @see vendor/cyrus-48/paysasa/src/Http/Controllers/WebhookController.php:37
* @route '/paysasa/webhooks/{provider}'
*/
handle.url = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provider: args }
    }

    if (Array.isArray(args)) {
        args = {
            provider: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        provider: args.provider,
    }

    return handle.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Paysasa\Payments\Http\Controllers\WebhookController::handle
* @see vendor/cyrus-48/paysasa/src/Http/Controllers/WebhookController.php:37
* @route '/paysasa/webhooks/{provider}'
*/
handle.get = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handle.url(args, options),
    method: 'get',
})

/**
* @see \Paysasa\Payments\Http\Controllers\WebhookController::handle
* @see vendor/cyrus-48/paysasa/src/Http/Controllers/WebhookController.php:37
* @route '/paysasa/webhooks/{provider}'
*/
handle.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(args, options),
    method: 'post',
})

/**
* @see \Paysasa\Payments\Http\Controllers\WebhookController::handle
* @see vendor/cyrus-48/paysasa/src/Http/Controllers/WebhookController.php:37
* @route '/paysasa/webhooks/{provider}'
*/
handle.head = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: handle.url(args, options),
    method: 'head',
})

/**
* @see \Paysasa\Payments\Http\Controllers\WebhookController::handle
* @see vendor/cyrus-48/paysasa/src/Http/Controllers/WebhookController.php:37
* @route '/paysasa/webhooks/{provider}'
*/
const handleForm = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: handle.url(args, options),
    method: 'get',
})

/**
* @see \Paysasa\Payments\Http\Controllers\WebhookController::handle
* @see vendor/cyrus-48/paysasa/src/Http/Controllers/WebhookController.php:37
* @route '/paysasa/webhooks/{provider}'
*/
handleForm.get = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: handle.url(args, options),
    method: 'get',
})

/**
* @see \Paysasa\Payments\Http\Controllers\WebhookController::handle
* @see vendor/cyrus-48/paysasa/src/Http/Controllers/WebhookController.php:37
* @route '/paysasa/webhooks/{provider}'
*/
handleForm.post = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: handle.url(args, options),
    method: 'post',
})

/**
* @see \Paysasa\Payments\Http\Controllers\WebhookController::handle
* @see vendor/cyrus-48/paysasa/src/Http/Controllers/WebhookController.php:37
* @route '/paysasa/webhooks/{provider}'
*/
handleForm.head = (args: { provider: string | number } | [provider: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: handle.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

handle.form = handleForm

const WebhookController = { handle }

export default WebhookController