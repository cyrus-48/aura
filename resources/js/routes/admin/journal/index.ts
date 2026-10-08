import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/journal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
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
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/journal/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
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
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/journal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
export const edit = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/journal/{post}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
edit.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return edit.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
edit.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
edit.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
const editForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
editForm.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
editForm.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
export const update = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/journal/{post}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
update.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return update.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
update.put = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
const updateForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
updateForm.put = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
export const destroy = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/journal/{post}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
destroy.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return destroy.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
destroy.delete = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
const destroyForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
destroyForm.delete = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const journal = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default journal