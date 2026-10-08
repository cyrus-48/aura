import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingIndexController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingIndexController.php:17
* @route '/admin/settings'
*/
const StoreSettingIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: StoreSettingIndexController.url(options),
    method: 'get',
})

StoreSettingIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingIndexController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingIndexController.php:17
* @route '/admin/settings'
*/
StoreSettingIndexController.url = (options?: RouteQueryOptions) => {
    return StoreSettingIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingIndexController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingIndexController.php:17
* @route '/admin/settings'
*/
StoreSettingIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: StoreSettingIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingIndexController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingIndexController.php:17
* @route '/admin/settings'
*/
StoreSettingIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: StoreSettingIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingIndexController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingIndexController.php:17
* @route '/admin/settings'
*/
const StoreSettingIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: StoreSettingIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingIndexController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingIndexController.php:17
* @route '/admin/settings'
*/
StoreSettingIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: StoreSettingIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Setting\StoreSettingIndexController::__invoke
* @see app/Http/Controllers/Admin/Setting/StoreSettingIndexController.php:17
* @route '/admin/settings'
*/
StoreSettingIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: StoreSettingIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

StoreSettingIndexController.form = StoreSettingIndexControllerForm

export default StoreSettingIndexController