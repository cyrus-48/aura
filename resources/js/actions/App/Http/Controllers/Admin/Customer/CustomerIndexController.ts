import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
const CustomerIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CustomerIndexController.url(options),
    method: 'get',
})

CustomerIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/customers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
CustomerIndexController.url = (options?: RouteQueryOptions) => {
    return CustomerIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
CustomerIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CustomerIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
CustomerIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CustomerIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
const CustomerIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CustomerIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
CustomerIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CustomerIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Customer\CustomerIndexController::__invoke
* @see app/Http/Controllers/Admin/Customer/CustomerIndexController.php:20
* @route '/admin/customers'
*/
CustomerIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CustomerIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

CustomerIndexController.form = CustomerIndexControllerForm

export default CustomerIndexController