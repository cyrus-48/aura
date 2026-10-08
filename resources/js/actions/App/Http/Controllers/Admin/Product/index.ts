import ProductIndexController from './ProductIndexController'
import ProductCreateController from './ProductCreateController'
import ProductStoreController from './ProductStoreController'
import ProductEditController from './ProductEditController'
import ProductUpdateController from './ProductUpdateController'
import ProductDestroyController from './ProductDestroyController'
import ProductDuplicateController from './ProductDuplicateController'
import ProductBulkController from './ProductBulkController'

const Product = {
    ProductIndexController: Object.assign(ProductIndexController, ProductIndexController),
    ProductCreateController: Object.assign(ProductCreateController, ProductCreateController),
    ProductStoreController: Object.assign(ProductStoreController, ProductStoreController),
    ProductEditController: Object.assign(ProductEditController, ProductEditController),
    ProductUpdateController: Object.assign(ProductUpdateController, ProductUpdateController),
    ProductDestroyController: Object.assign(ProductDestroyController, ProductDestroyController),
    ProductDuplicateController: Object.assign(ProductDuplicateController, ProductDuplicateController),
    ProductBulkController: Object.assign(ProductBulkController, ProductBulkController),
}

export default Product