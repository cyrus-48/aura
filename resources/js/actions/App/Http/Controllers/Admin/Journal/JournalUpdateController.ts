import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
const JournalUpdateController = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: JournalUpdateController.url(args, options),
    method: 'put',
})

JournalUpdateController.definition = {
    methods: ["put"],
    url: '/admin/journal/{post}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
JournalUpdateController.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return JournalUpdateController.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
JournalUpdateController.put = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: JournalUpdateController.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
const JournalUpdateControllerForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: JournalUpdateController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Journal\JournalUpdateController::__invoke
* @see app/Http/Controllers/Admin/Journal/JournalUpdateController.php:17
* @route '/admin/journal/{post}'
*/
JournalUpdateControllerForm.put = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: JournalUpdateController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

JournalUpdateController.form = JournalUpdateControllerForm

export default JournalUpdateController