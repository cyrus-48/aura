import DashboardController from './DashboardController'
import Product from './Product'
import Category from './Category'
import Collection from './Collection'
import Inventory from './Inventory'
import Order from './Order'
import Customer from './Customer'
import Discount from './Discount'
import Payment from './Payment'
import Journal from './Journal'
import Content from './Content'
import Setting from './Setting'
import Staff from './Staff'

const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    Product: Object.assign(Product, Product),
    Category: Object.assign(Category, Category),
    Collection: Object.assign(Collection, Collection),
    Inventory: Object.assign(Inventory, Inventory),
    Order: Object.assign(Order, Order),
    Customer: Object.assign(Customer, Customer),
    Discount: Object.assign(Discount, Discount),
    Payment: Object.assign(Payment, Payment),
    Journal: Object.assign(Journal, Journal),
    Content: Object.assign(Content, Content),
    Setting: Object.assign(Setting, Setting),
    Staff: Object.assign(Staff, Staff),
}

export default Admin