import DiscountIndexController from './DiscountIndexController'
import DiscountStoreController from './DiscountStoreController'
import DiscountUpdateController from './DiscountUpdateController'
import DiscountDestroyController from './DiscountDestroyController'

const Discount = {
    DiscountIndexController: Object.assign(DiscountIndexController, DiscountIndexController),
    DiscountStoreController: Object.assign(DiscountStoreController, DiscountStoreController),
    DiscountUpdateController: Object.assign(DiscountUpdateController, DiscountUpdateController),
    DiscountDestroyController: Object.assign(DiscountDestroyController, DiscountDestroyController),
}

export default Discount