import InventoryIndexController from './InventoryIndexController'
import InventoryAdjustController from './InventoryAdjustController'
import InventoryMovementsController from './InventoryMovementsController'

const Inventory = {
    InventoryIndexController: Object.assign(InventoryIndexController, InventoryIndexController),
    InventoryAdjustController: Object.assign(InventoryAdjustController, InventoryAdjustController),
    InventoryMovementsController: Object.assign(InventoryMovementsController, InventoryMovementsController),
}

export default Inventory