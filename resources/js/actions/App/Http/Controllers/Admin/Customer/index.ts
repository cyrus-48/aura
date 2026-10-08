import CustomerIndexController from './CustomerIndexController'
import CustomerDetailController from './CustomerDetailController'
import CustomerNoteController from './CustomerNoteController'

const Customer = {
    CustomerIndexController: Object.assign(CustomerIndexController, CustomerIndexController),
    CustomerDetailController: Object.assign(CustomerDetailController, CustomerDetailController),
    CustomerNoteController: Object.assign(CustomerNoteController, CustomerNoteController),
}

export default Customer