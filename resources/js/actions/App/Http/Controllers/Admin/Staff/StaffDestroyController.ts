import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Staff\StaffDestroyController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffDestroyController.php:17
* @route '/admin/staff/{user}'
*/
const StaffDestroyController = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: StaffDestroyController.url(args, options),
    method: 'delete',
})

StaffDestroyController.definition = {
    methods: ["delete"],
    url: '/admin/staff/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\Staff\StaffDestroyController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffDestroyController.php:17
* @route '/admin/staff/{user}'
*/
StaffDestroyController.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return StaffDestroyController.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Staff\StaffDestroyController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffDestroyController.php:17
* @route '/admin/staff/{user}'
*/
StaffDestroyController.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: StaffDestroyController.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\Staff\StaffDestroyController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffDestroyController.php:17
* @route '/admin/staff/{user}'
*/
const StaffDestroyControllerForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: StaffDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Staff\StaffDestroyController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffDestroyController.php:17
* @route '/admin/staff/{user}'
*/
StaffDestroyControllerForm.delete = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: StaffDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

StaffDestroyController.form = StaffDestroyControllerForm

export default StaffDestroyController