import OrderIndexController from './OrderIndexController'
import OrderDetailController from './OrderDetailController'
import OrderStatusController from './OrderStatusController'
import OrderNoteController from './OrderNoteController'

const Order = {
    OrderIndexController: Object.assign(OrderIndexController, OrderIndexController),
    OrderDetailController: Object.assign(OrderDetailController, OrderDetailController),
    OrderStatusController: Object.assign(OrderStatusController, OrderStatusController),
    OrderNoteController: Object.assign(OrderNoteController, OrderNoteController),
}

export default Order