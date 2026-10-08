import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Category\CategoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryIndexController.php:17
* @route '/admin/categories'
*/
const CategoryIndexController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CategoryIndexController.url(options),
    method: 'get',
})

CategoryIndexController.definition = {
    methods: ["get","head"],
    url: '/admin/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Category\CategoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryIndexController.php:17
* @route '/admin/categories'
*/
CategoryIndexController.url = (options?: RouteQueryOptions) => {
    return CategoryIndexController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Category\CategoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryIndexController.php:17
* @route '/admin/categories'
*/
CategoryIndexController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CategoryIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryIndexController.php:17
* @route '/admin/categories'
*/
CategoryIndexController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CategoryIndexController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryIndexController.php:17
* @route '/admin/categories'
*/
const CategoryIndexControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CategoryIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryIndexController.php:17
* @route '/admin/categories'
*/
CategoryIndexControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CategoryIndexController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryIndexController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryIndexController.php:17
* @route '/admin/categories'
*/
CategoryIndexControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CategoryIndexController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

CategoryIndexController.form = CategoryIndexControllerForm

export default CategoryIndexController