import CollectionIndexController from './CollectionIndexController'
import CollectionCreateController from './CollectionCreateController'
import CollectionStoreController from './CollectionStoreController'
import CollectionEditController from './CollectionEditController'
import CollectionUpdateController from './CollectionUpdateController'
import CollectionDestroyController from './CollectionDestroyController'

const Collection = {
    CollectionIndexController: Object.assign(CollectionIndexController, CollectionIndexController),
    CollectionCreateController: Object.assign(CollectionCreateController, CollectionCreateController),
    CollectionStoreController: Object.assign(CollectionStoreController, CollectionStoreController),
    CollectionEditController: Object.assign(CollectionEditController, CollectionEditController),
    CollectionUpdateController: Object.assign(CollectionUpdateController, CollectionUpdateController),
    CollectionDestroyController: Object.assign(CollectionDestroyController, CollectionDestroyController),
}

export default Collection