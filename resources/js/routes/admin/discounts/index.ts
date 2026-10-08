import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/discounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountIndexController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountIndexController.php:19
* @route '/admin/discounts'
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
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/discounts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountStoreController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountStoreController.php:17
* @route '/admin/discounts'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
export const update = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/discounts/{discount}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
update.url = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { discount: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { discount: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            discount: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        discount: typeof args.discount === 'object'
        ? args.discount.id
        : args.discount,
    }

    return update.definition.url
            .replace('{discount}', parsedArgs.discount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
update.put = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
const updateForm = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountUpdateController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountUpdateController.php:17
* @route '/admin/discounts/{discount}'
*/
updateForm.put = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
export const destroy = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/discounts/{discount}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
destroy.url = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { discount: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { discount: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            discount: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        discount: typeof args.discount === 'object'
        ? args.discount.id
        : args.discount,
    }

    return destroy.definition.url
            .replace('{discount}', parsedArgs.discount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
destroy.delete = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
const destroyForm = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Discount\DiscountDestroyController::__invoke
* @see app/Http/Controllers/Admin/Discount/DiscountDestroyController.php:16
* @route '/admin/discounts/{discount}'
*/
destroyForm.delete = (args: { discount: number | { id: number } } | [discount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const discounts = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default discounts