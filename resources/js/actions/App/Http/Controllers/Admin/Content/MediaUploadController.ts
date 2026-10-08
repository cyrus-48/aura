import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
const MediaUploadController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MediaUploadController.url(options),
    method: 'post',
})

MediaUploadController.definition = {
    methods: ["post"],
    url: '/admin/media/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
MediaUploadController.url = (options?: RouteQueryOptions) => {
    return MediaUploadController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
MediaUploadController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MediaUploadController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
const MediaUploadControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: MediaUploadController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\Content\MediaUploadController::__invoke
* @see app/Http/Controllers/Admin/Content/MediaUploadController.php:17
* @route '/admin/media/upload'
*/
MediaUploadControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: MediaUploadController.url(options),
    method: 'post',
})

MediaUploadController.form = MediaUploadControllerForm

export default MediaUploadController