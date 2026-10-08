import PageContentController from './PageContentController'
import MediaLibraryController from './MediaLibraryController'
import MediaUploadController from './MediaUploadController'

const Content = {
    PageContentController: Object.assign(PageContentController, PageContentController),
    MediaLibraryController: Object.assign(MediaLibraryController, MediaLibraryController),
    MediaUploadController: Object.assign(MediaUploadController, MediaUploadController),
}

export default Content