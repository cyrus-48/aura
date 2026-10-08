import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingUpdateController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingUpdateController.php:17
* @route '/admin/settings'
*/
const StoreSettingUpdateController = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: StoreSettingUpdateController.url(options),
    method: 'put',
})

StoreSettingUpdateController.definition = {
    methods: ["put"],
    url: '/admin/settings',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingUpdateController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingUpdateController.php:17
* @route '/admin/settings'
*/
StoreSettingUpdateController.url = (options?: RouteQueryOptions) => {
    return StoreSettingUpdateController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingUpdateController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingUpdateController.php:17
* @route '/admin/settings'
*/
StoreSettingUpdateController.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: StoreSettingUpdateController.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingUpdateController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingUpdateController.php:17
* @route '/admin/settings'
*/
const StoreSettingUpdateControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: StoreSettingUpdateController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingUpdateController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingUpdateController.php:17
* @route '/admin/settings'
*/
StoreSettingUpdateControllerForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: StoreSettingUpdateController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

StoreSettingUpdateController.form = StoreSettingUpdateControllerForm

export default StoreSettingUpdateController