import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
const JournalStoreController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: JournalStoreController.url(options),
    method: 'post',
})

JournalStoreController.definition = {
    methods: ["post"],
    url: '/admin/journal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
JournalStoreController.url = (options?: RouteQueryOptions) => {
    return JournalStoreController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
JournalStoreController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: JournalStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
const JournalStoreControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: JournalStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalStoreController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalStoreController.php:17
* @route '/admin/journal'
*/
JournalStoreControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: JournalStoreController.url(options),
    method: 'post',
})

JournalStoreController.form = JournalStoreControllerForm

export default JournalStoreController