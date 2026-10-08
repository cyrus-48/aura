import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Staff\StaffIndexController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffIndexController.php:18
* @route '/admin/staff'
*/
const StaffIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: StaffIndexController.url(options),
    method: 'get',
})

StaffIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/staff',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Staff\StaffIndexController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffIndexController.php:18
* @route '/admin/staff'
*/
StaffIndexController.url = (options?: RouteQueryOptions) => {
    return StaffIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Staff\StaffIndexController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffIndexController.php:18
* @route '/admin/staff'
*/
StaffIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: StaffIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Staff\StaffIndexController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffIndexController.php:18
* @route '/admin/staff'
*/
StaffIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: StaffIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Staff\StaffIndexController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffIndexController.php:18
* @route '/admin/staff'
*/
const StaffIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: StaffIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Staff\StaffIndexController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffIndexController.php:18
* @route '/admin/staff'
*/
StaffIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: StaffIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Staff\StaffIndexController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffIndexController.php:18
* @route '/admin/staff'
*/
StaffIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: StaffIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

StaffIndexController.form = StaffIndexControllerForm

export default StaffIndexController