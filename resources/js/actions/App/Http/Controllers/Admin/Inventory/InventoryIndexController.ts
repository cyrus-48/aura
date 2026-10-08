import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
const InventoryIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: InventoryIndexController.url(options),
    method: 'get',
})

InventoryIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/inventory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
InventoryIndexController.url = (options?: RouteQueryOptions) => {
    return InventoryIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
InventoryIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: InventoryIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
InventoryIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: InventoryIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
const InventoryIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: InventoryIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
InventoryIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: InventoryIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryIndexController.php:22
* @route '/admin/inventory'
*/
InventoryIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: InventoryIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

InventoryIndexController.form = InventoryIndexControllerForm

export default InventoryIndexController