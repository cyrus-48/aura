import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/inventory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
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
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
export const adjust = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adjust.url(options),
    method: 'post',
})

adjust.definition = {
    methods: ["post"],
    url: '/admin/inventory/adjust',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
adjust.url = (options?: RouteQueryOptions) => {
    return adjust.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
adjust.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adjust.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
const adjustForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: adjust.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
adjustForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: adjust.url(options),
    method: 'post',
})

adjust.form = adjustForm

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
export const movements = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: movements.url(args, options),
    method: 'get',
})

movements.definition = {
    methods: ["get","head"],
    url: '/admin/inventory/{variant}/movements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
movements.url = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { variant: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { variant: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            variant: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        variant: typeof args.variant === 'object'
        ? args.variant.id
        : args.variant,
    }

    return movements.definition.url
            .replace('{variant}', parsedArgs.variant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
movements.get = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: movements.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
movements.head = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: movements.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
const movementsForm = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: movements.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
movementsForm.get = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: movements.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
movementsForm.head = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: movements.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

movements.form = movementsForm

const inventory = {
    index: Object.assign(index, index),
    adjust: Object.assign(adjust, adjust),
    movements: Object.assign(movements, movements),
}

export default inventory