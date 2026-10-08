import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import notes from './notes'
/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/customers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
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

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
export const show = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/customers/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
show.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
show.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
show.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
const showForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
showForm.get = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerDetailController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerDetailController.php:20
* @route '/admin/customers/{user}'
*/
showForm.head = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const customers = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    notes: Object.assign(notes, notes),
}

export default customers