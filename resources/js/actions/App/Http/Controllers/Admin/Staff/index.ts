import StaffIndexController from './StaffIndexController'
import StaffStoreController from './StaffStoreController'
import StaffDestroyController from './StaffDestroyController'

const Staff = {
    StaffIndexController: Object.assign(StaffIndexController, StaffIndexController),
    StaffStoreController: Object.assign(StaffStoreController, StaffStoreController),
    StaffDestroyController: Object.assign(StaffDestroyController, StaffDestroyController),
}

export default Staff