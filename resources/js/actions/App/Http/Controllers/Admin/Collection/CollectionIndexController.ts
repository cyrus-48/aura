import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
const CollectionIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CollectionIndexController.url(options),
    method: 'get',
})

CollectionIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/collections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
CollectionIndexController.url = (options?: RouteQueryOptions) => {
    return CollectionIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
CollectionIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CollectionIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
CollectionIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CollectionIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
const CollectionIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CollectionIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
CollectionIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CollectionIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
CollectionIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CollectionIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

CollectionIndexController.form = CollectionIndexControllerForm

export default CollectionIndexController