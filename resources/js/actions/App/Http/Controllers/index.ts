import Storefront from './Storefront'
import Admin from './Admin'
import Settings from './Settings'

const Controllers = {
    Storefront: Object.assign(Storefront, Storefront),
    Admin: Object.assign(Admin, Admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers