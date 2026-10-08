import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Collection\CollectionDestroyController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionDestroyController.php:16
* @route '/admin/collections/{collection}'
*/
const CollectionDestroyController = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: CollectionDestroyController.url(args, options),
    method: 'delete',
})

CollectionDestroyController.definition = {
    methods: ["delete"],
    url: '/admin/collections/{collection}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionDestroyController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionDestroyController.php:16
* @route '/admin/collections/{collection}'
*/
CollectionDestroyController.url = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { collection: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { collection: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            collection: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        collection: typeof args.collection === 'object'
        ? args.collection.id
        : args.collection,
    }

    return CollectionDestroyController.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionDestroyController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionDestroyController.php:16
* @route '/admin/collections/{collection}'
*/
CollectionDestroyController.delete = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: CollectionDestroyController.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionDestroyController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionDestroyController.php:16
* @route '/admin/collections/{collection}'
*/
const CollectionDestroyControllerForm = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CollectionDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionDestroyController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionDestroyController.php:16
* @route '/admin/collections/{collection}'
*/
CollectionDestroyControllerForm.delete = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CollectionDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

CollectionDestroyController.form = CollectionDestroyControllerForm

export default CollectionDestroyController