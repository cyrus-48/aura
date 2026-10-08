import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Category\CategoryUpdateController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryUpdateController.php:18
* @route '/admin/categories/{category}'
*/
const CategoryUpdateController = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: CategoryUpdateController.url(args, options),
    method: 'put',
})

CategoryUpdateController.definition = {
    methods: ["put"],
    url: '/admin/categories/{category}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\Category\CategoryUpdateController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryUpdateController.php:18
* @route '/admin/categories/{category}'
*/
CategoryUpdateController.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return CategoryUpdateController.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Category\CategoryUpdateController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryUpdateController.php:18
* @route '/admin/categories/{category}'
*/
CategoryUpdateController.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: CategoryUpdateController.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryUpdateController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryUpdateController.php:18
* @route '/admin/categories/{category}'
*/
const CategoryUpdateControllerForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CategoryUpdateController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryUpdateController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryUpdateController.php:18
* @route '/admin/categories/{category}'
*/
CategoryUpdateControllerForm.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CategoryUpdateController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

CategoryUpdateController.form = CategoryUpdateControllerForm

export default CategoryUpdateController