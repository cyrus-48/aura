import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
const CollectionStoreController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: CollectionStoreController.url(options),
    method: 'post',
})

CollectionStoreController.definition = {
    methods: ["post"],
    url: '/admin/collections',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
CollectionStoreController.url = (options?: RouteQueryOptions) => {
    return CollectionStoreController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
CollectionStoreController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: CollectionStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
const CollectionStoreControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CollectionStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
CollectionStoreControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CollectionStoreController.url(options),
    method: 'post',
})

CollectionStoreController.form = CollectionStoreControllerForm

export default CollectionStoreController