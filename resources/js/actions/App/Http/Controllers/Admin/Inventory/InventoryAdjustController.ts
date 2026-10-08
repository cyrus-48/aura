import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
const InventoryAdjustController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: InventoryAdjustController.url(options),
    method: 'post',
})

InventoryAdjustController.definition = {
    methods: ["post"],
    url: '/admin/inventory/adjust',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
InventoryAdjustController.url = (options?: RouteQueryOptions) => {
    return InventoryAdjustController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
InventoryAdjustController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: InventoryAdjustController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
const InventoryAdjustControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: InventoryAdjustController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Inventory\InventoryAdjustController::__invoke
* @see app/Http/Controllers/Admin/Inventory/InventoryAdjustController.php:19
* @route '/admin/inventory/adjust'
*/
InventoryAdjustControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: InventoryAdjustController.url(options),
    method: 'post',
})

InventoryAdjustController.form = InventoryAdjustControllerForm

export default InventoryAdjustController