import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Staff\StaffStoreController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffStoreController.php:20
* @route '/admin/staff'
*/
const StaffStoreController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StaffStoreController.url(options),
    method: 'post',
})

StaffStoreController.definition = {
    methods: ["post"],
    url: '/admin/staff',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Staff\StaffStoreController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffStoreController.php:20
* @route '/admin/staff'
*/
StaffStoreController.url = (options?: RouteQueryOptions) => {
    return StaffStoreController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Staff\StaffStoreController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffStoreController.php:20
* @route '/admin/staff'
*/
StaffStoreController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StaffStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Staff\StaffStoreController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffStoreController.php:20
* @route '/admin/staff'
*/
const StaffStoreControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: StaffStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Staff\StaffStoreController::__invoke
* @see app/Http/Controllers/Admin/Staff/StaffStoreController.php:20
* @route '/admin/staff'
*/
StaffStoreControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: StaffStoreController.url(options),
    method: 'post',
})

StaffStoreController.form = StaffStoreControllerForm

export default StaffStoreController