import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Order\OrderNoteController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderNoteController.php:18
* @route '/admin/orders/{order}/notes'
*/
const OrderNoteController = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: OrderNoteController.url(args, options),
    method: 'post',
})

OrderNoteController.definition = {
    methods: ["post"],
    url: '/admin/orders/{order}/notes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Order\OrderNoteController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderNoteController.php:18
* @route '/admin/orders/{order}/notes'
*/
OrderNoteController.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return OrderNoteController.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Order\OrderNoteController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderNoteController.php:18
* @route '/admin/orders/{order}/notes'
*/
OrderNoteController.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: OrderNoteController.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderNoteController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderNoteController.php:18
* @route '/admin/orders/{order}/notes'
*/
const OrderNoteControllerForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: OrderNoteController.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Order\OrderNoteController::__invoke
* @see app/Http/Controllers/Admin/Order/OrderNoteController.php:18
* @route '/admin/orders/{order}/notes'
*/
OrderNoteControllerForm.post = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: OrderNoteController.url(args, options),
    method: 'post',
})

OrderNoteController.form = OrderNoteControllerForm

export default OrderNoteController