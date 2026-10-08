import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
const JournalDestroyController = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: JournalDestroyController.url(args, options),
    method: 'delete',
})

JournalDestroyController.definition = {
    methods: ["delete"],
    url: '/admin/journal/{post}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
JournalDestroyController.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return JournalDestroyController.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
JournalDestroyController.delete = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: JournalDestroyController.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
const JournalDestroyControllerForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: JournalDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalDestroyController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalDestroyController.php:16
* @route '/admin/journal/{post}'
*/
JournalDestroyControllerForm.delete = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: JournalDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

JournalDestroyController.form = JournalDestroyControllerForm

export default JournalDestroyController