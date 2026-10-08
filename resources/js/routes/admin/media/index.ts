import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Content\MediaLibraryController::index
* @see app/Http/Controllers/Admin/Content/MediaLibraryController.php:21
* @route '/admin/media'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/media',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\Content\MediaLibraryController::index
* @see app/Http/Controllers/Admin/Content/MediaLibraryController.php:21
* @route '/admin/media'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Content\MediaLibraryController::index
* @see app/Http/Controllers/Admin/Content/MediaLibraryController.php:21
* @route '/admin/media'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Content\MediaLibraryController::index
* @see app/Http/Controllers/Admin/Content/MediaLibraryController.php:21
* @route '/admin/media'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Content\MediaLibraryController::index
* @see app/Http/Controllers/Admin/Content/MediaLibraryController.php:21
* @route '/admin/media'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Content\MediaLibraryController::index
* @see app/Http/Controllers/Admin/Content/MediaLibraryController.php:21
* @route '/admin/media'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\Content\MediaLibraryController::index
* @see app/Http/Controllers/Admin/Content/MediaLibraryController.php:21
* @route '/admin/media'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/admin/media/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
const uploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
uploadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(options),
    method: 'post',
})

upload.form = uploadForm

const media = {
    index: Object.assign(index, index),
    upload: Object.assign(upload, upload),
}

export default media