import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/collections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionIndexController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionIndexController.php:17
* @route '/admin/collections'
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
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/collections/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionCreateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionCreateController.php:17
* @route '/admin/collections/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/collections',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionStoreController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionStoreController.php:17
* @route '/admin/collections'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
export const edit = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/collections/{collection}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
edit.url = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
edit.get = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
edit.head = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
const editForm = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
editForm.get = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionEditController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionEditController.php:18
* @route '/admin/collections/{collection}/edit'
*/
editForm.head = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionUpdateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionUpdateController.php:18
* @route '/admin/collections/{collection}'
*/
export const update = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/collections/{collection}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionUpdateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionUpdateController.php:18
* @route '/admin/collections/{collection}'
*/
update.url = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionUpdateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionUpdateController.php:18
* @route '/admin/collections/{collection}'
*/
update.put = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionUpdateController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionUpdateController.php:18
* @route '/admin/collections/{collection}'
*/
const updateForm = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
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
updateForm.put = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionDestroyController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionDestroyController.php:16
* @route '/admin/collections/{collection}'
*/
export const destroy = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/collections/{collection}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionDestroyController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionDestroyController.php:16
* @route '/admin/collections/{collection}'
*/
destroy.url = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionDestroyController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionDestroyController.php:16
* @route '/admin/collections/{collection}'
*/
destroy.delete = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\Collection\CollectionDestroyController::__invoke
* @see app/Http/Controllers/Admin/Collection/CollectionDestroyController.php:16
* @route '/admin/collections/{collection}'
*/
const destroyForm = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
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
destroyForm.delete = (args: { collection: number | { id: number } } | [collection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const collections = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default collections