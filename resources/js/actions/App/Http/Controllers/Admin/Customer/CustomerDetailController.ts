import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
const CustomerDetailController = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CustomerDetailController.url(args, options),
    method: 'get',
})

CustomerDetailController.definition = {
    methods: ["get","head"],
    url: '/admin/customers/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
CustomerDetailController.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return CustomerDetailController.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
CustomerDetailController.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CustomerDetailController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
CustomerDetailController.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CustomerDetailController.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
const CustomerDetailControllerForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CustomerDetailController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
CustomerDetailControllerForm.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CustomerDetailController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
CustomerDetailControllerForm.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CustomerDetailController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

CustomerDetailController.form = CustomerDetailControllerForm

export default CustomerDetailController