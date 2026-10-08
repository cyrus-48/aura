import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
const CollectionCreateController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CollectionCreateController.url(options),
    method: 'get',
})

CollectionCreateController.definition = {
    methods: ["get","head"],
    url: '/admin/collections/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
CollectionCreateController.url = (options?: RouteQueryOptions) => {
    return CollectionCreateController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
CollectionCreateController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CollectionCreateController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
CollectionCreateController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CollectionCreateController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
const CollectionCreateControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CollectionCreateController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
CollectionCreateControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CollectionCreateController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
CollectionCreateControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CollectionCreateController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

CollectionCreateController.form = CollectionCreateControllerForm

export default CollectionCreateController