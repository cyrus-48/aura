import JournalIndexController from './JournalIndexController'
import JournalCreateController from './JournalCreateController'
import JournalStoreController from './JournalStoreController'
import JournalEditController from './JournalEditController'
import JournalUpdateController from './JournalUpdateController'
import JournalDestroyController from './JournalDestroyController'

const Journal = {
    JournalIndexController: Object.assign(JournalIndexController, JournalIndexController),
    JournalCreateController: Object.assign(JournalCreateController, JournalCreateController),
    JournalStoreController: Object.assign(JournalStoreController, JournalStoreController),
    JournalEditController: Object.assign(JournalEditController, JournalEditController),
    JournalUpdateController: Object.assign(JournalUpdateController, JournalUpdateController),
    JournalDestroyController: Object.assign(JournalDestroyController, JournalDestroyController),
}

export default Journal