import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Collection\CollectionUpdateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionUpdateController.php:18
* @route '/admin/collections/{collection}'
*/
const CollectionUpdateController = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: CollectionUpdateController.url(args, options),
    method: 'put',
})

CollectionUpdateController.definition = {
    methods: ["put"],
    url: '/admin/collections/{collection}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionUpdateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionUpdateController.php:18
* @route '/admin/collections/{collection}'
*/
CollectionUpdateController.url = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return CollectionUpdateController.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionUpdateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionUpdateController.php:18
* @route '/admin/collections/{collection}'
*/
CollectionUpdateController.put = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: CollectionUpdateController.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionUpdateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionUpdateController.php:18
* @route '/admin/collections/{collection}'
*/
const CollectionUpdateControllerForm = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CollectionUpdateController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionUpdateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionUpdateController.php:18
* @route '/admin/collections/{collection}'
*/
CollectionUpdateControllerForm.put = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CollectionUpdateController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

CollectionUpdateController.form = CollectionUpdateControllerForm

export default CollectionUpdateController