import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
const JournalIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: JournalIndexController.url(options),
    method: 'get',
})

JournalIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/journal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
JournalIndexController.url = (options?: RouteQueryOptions) => {
    return JournalIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
JournalIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: JournalIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
JournalIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: JournalIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
const JournalIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: JournalIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
JournalIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: JournalIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalIndexController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalIndexController.php:19
* @route '/admin/journal'
*/
JournalIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: JournalIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

JournalIndexController.form = JournalIndexControllerForm

export default JournalIndexController