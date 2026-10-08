import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Storefront\CollectionController::index
* @see app/Http/Controllers/Storefront/CollectionController.php:19
* @route '/collections'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/collections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\CollectionController::index
* @see app/Http/Controllers/Storefront/CollectionController.php:19
* @route '/collections'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\CollectionController::index
* @see app/Http/Controllers/Storefront/CollectionController.php:19
* @route '/collections'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CollectionController::index
* @see app/Http/Controllers/Storefront/CollectionController.php:19
* @route '/collections'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\CollectionController::index
* @see app/Http/Controllers/Storefront/CollectionController.php:19
* @route '/collections'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CollectionController::index
* @see app/Http/Controllers/Storefront/CollectionController.php:19
* @route '/collections'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CollectionController::index
* @see app/Http/Controllers/Storefront/CollectionController.php:19
* @route '/collections'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Storefront\CollectionController::show
* @see app/Http/Controllers/Storefront/CollectionController.php:31
* @route '/collections/{collection}'
*/
export const show = (args: { collection: string | { slug: string } } | [collection: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/collections/{collection}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Storefront\CollectionController::show
* @see app/Http/Controllers/Storefront/CollectionController.php:31
* @route '/collections/{collection}'
*/
show.url = (args: { collection: string | { slug: string } } | [collection: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { collection: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { collection: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            collection: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        collection: typeof args.collection === 'object'
        ? args.collection.slug
        : args.collection,
    }

    return show.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Storefront\CollectionController::show
* @see app/Http/Controllers/Storefront/CollectionController.php:31
* @route '/collections/{collection}'
*/
show.get = (args: { collection: string | { slug: string } } | [collection: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CollectionController::show
* @see app/Http/Controllers/Storefront/CollectionController.php:31
* @route '/collections/{collection}'
*/
show.head = (args: { collection: string | { slug: string } } | [collection: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Storefront\CollectionController::show
* @see app/Http/Controllers/Storefront/CollectionController.php:31
* @route '/collections/{collection}'
*/
const showForm = (args: { collection: string | { slug: string } } | [collection: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CollectionController::show
* @see app/Http/Controllers/Storefront/CollectionController.php:31
* @route '/collections/{collection}'
*/
showForm.get = (args: { collection: string | { slug: string } } | [collection: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Storefront\CollectionController::show
* @see app/Http/Controllers/Storefront/CollectionController.php:31
* @route '/collections/{collection}'
*/
showForm.head = (args: { collection: string | { slug: string } } | [collection: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const CollectionController = { index, show }

export default CollectionController