import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
const CollectionEditController = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CollectionEditController.url(args, options),
    method: 'get',
})

CollectionEditController.definition = {
    methods: ["get","head"],
    url: '/admin/collections/{collection}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
CollectionEditController.url = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return CollectionEditController.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
CollectionEditController.get = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CollectionEditController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
CollectionEditController.head = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CollectionEditController.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
const CollectionEditControllerForm = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CollectionEditController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
CollectionEditControllerForm.get = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CollectionEditController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
CollectionEditControllerForm.head = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CollectionEditController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

CollectionEditController.form = CollectionEditControllerForm

export default CollectionEditController