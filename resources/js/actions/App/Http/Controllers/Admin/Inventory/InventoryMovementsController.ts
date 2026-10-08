import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
const InventoryMovementsController = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: InventoryMovementsController.url(args, options),
    method: 'get',
})

InventoryMovementsController.definition = {
    methods: ["get","head"],
    url: '/admin/inventory/{variant}/movements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
InventoryMovementsController.url = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return InventoryMovementsController.definition.url
            .replace('{variant}', parsedArgs.variant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
InventoryMovementsController.get = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: InventoryMovementsController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
InventoryMovementsController.head = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: InventoryMovementsController.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
const InventoryMovementsControllerForm = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: InventoryMovementsController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
InventoryMovementsControllerForm.get = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: InventoryMovementsController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryMovementsController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryMovementsController.php:17
* @route '/admin/inventory/{variant}/movements'
*/
InventoryMovementsControllerForm.head = (args: { variant: number | { id: number } } | [variant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: InventoryMovementsController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

InventoryMovementsController.form = InventoryMovementsControllerForm

export default InventoryMovementsController