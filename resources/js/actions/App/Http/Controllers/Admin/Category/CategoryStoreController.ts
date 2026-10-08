import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Category\CategoryStoreController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryStoreController.php:17
* @route '/admin/categories'
*/
const CategoryStoreController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: CategoryStoreController.url(options),
    method: 'post',
})

CategoryStoreController.definition = {
    methods: ["post"],
    url: '/admin/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Category\CategoryStoreController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryStoreController.php:17
* @route '/admin/categories'
*/
CategoryStoreController.url = (options?: RouteQueryOptions) => {
    return CategoryStoreController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Category\CategoryStoreController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryStoreController.php:17
* @route '/admin/categories'
*/
CategoryStoreController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: CategoryStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryStoreController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryStoreController.php:17
* @route '/admin/categories'
*/
const CategoryStoreControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CategoryStoreController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Category\CategoryStoreController::__invoke
* @see app/Http/Controllers/Admin/Category/CategoryStoreController.php:17
* @route '/admin/categories'
*/
CategoryStoreControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: CategoryStoreController.url(options),
    method: 'post',
})

CategoryStoreController.form = CategoryStoreControllerForm

export default CategoryStoreController