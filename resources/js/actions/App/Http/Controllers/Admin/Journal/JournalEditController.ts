import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
const JournalEditController = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: JournalEditController.url(args, options),
    method: 'get',
})

JournalEditController.definition = {
    methods: ["get","head"],
    url: '/admin/journal/{post}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
JournalEditController.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return JournalEditController.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
JournalEditController.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: JournalEditController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
JournalEditController.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: JournalEditController.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
const JournalEditControllerForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: JournalEditController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
JournalEditControllerForm.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: JournalEditController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalEditController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalEditController.php:17
* @route '/admin/journal/{post}/edit'
*/
JournalEditControllerForm.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: JournalEditController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

JournalEditController.form = JournalEditControllerForm

export default JournalEditController