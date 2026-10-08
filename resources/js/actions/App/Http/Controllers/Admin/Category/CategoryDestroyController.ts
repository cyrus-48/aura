import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Category\CategoryDestroyController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryDestroyController.php:16
* @route '/admin/categories/{category}'
*/
const CategoryDestroyController = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: CategoryDestroyController.url(args, options),
    method: 'delete',
})

CategoryDestroyController.definition = {
    methods: ["delete"],
    url: '/admin/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\Category\CategoryDestroyController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryDestroyController.php:16
* @route '/admin/categories/{category}'
*/
CategoryDestroyController.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { category: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        category: typeof args.category === 'object'
        ? args.category.id
        : args.category,
    }

    return CategoryDestroyController.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Category\CategoryDestroyController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryDestroyController.php:16
* @route '/admin/categories/{category}'
*/
CategoryDestroyController.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: CategoryDestroyController.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryDestroyController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryDestroyController.php:16
* @route '/admin/categories/{category}'
*/
const CategoryDestroyControllerForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CategoryDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryDestroyController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryDestroyController.php:16
* @route '/admin/categories/{category}'
*/
CategoryDestroyControllerForm.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CategoryDestroyController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

CategoryDestroyController.form = CategoryDestroyControllerForm

export default CategoryDestroyController