import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
const JournalCreateController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: JournalCreateController.url(options),
    method: 'get',
})

JournalCreateController.definition = {
    methods: ["get","head"],
    url: '/admin/journal/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
JournalCreateController.url = (options?: RouteQueryOptions) => {
    return JournalCreateController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
JournalCreateController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: JournalCreateController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
JournalCreateController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: JournalCreateController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
const JournalCreateControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: JournalCreateController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
JournalCreateControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: JournalCreateController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalCreateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalCreateController.php:16
* @route '/admin/journal/create'
*/
JournalCreateControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: JournalCreateController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

JournalCreateController.form = JournalCreateControllerForm

export default JournalCreateController