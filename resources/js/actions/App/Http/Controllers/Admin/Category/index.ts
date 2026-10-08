import CategoryIndexController from './CategoryIndexController'
import CategoryStoreController from './CategoryStoreController'
import CategoryUpdateController from './CategoryUpdateController'
import CategoryDestroyController from './CategoryDestroyController'

const Category = {
    CategoryIndexController: Object.assign(CategoryIndexController, CategoryIndexController),
    CategoryStoreController: Object.assign(CategoryStoreController, CategoryStoreController),
    CategoryUpdateController: Object.assign(CategoryUpdateController, CategoryUpdateController),
    CategoryDestroyController: Object.assign(CategoryDestroyController, CategoryDestroyController),
}

export default Category