import HomeController from './HomeController'
import ShopController from './ShopController'
import CollectionController from './CollectionController'
import ProductController from './ProductController'
import CartController from './CartController'
import CheckoutController from './CheckoutController'
import OrderConfirmationController from './OrderConfirmationController'
import JournalController from './JournalController'
import ContentPageController from './ContentPageController'
import AccountController from './AccountController'
import PaymentWebhookController from './PaymentWebhookController'

const Storefront = {
    HomeController: Object.assign(HomeController, HomeController),
    ShopController: Object.assign(ShopController, ShopController),
    CollectionController: Object.assign(CollectionController, CollectionController),
    ProductController: Object.assign(ProductController, ProductController),
    CartController: Object.assign(CartController, CartController),
    CheckoutController: Object.assign(CheckoutController, CheckoutController),
    OrderConfirmationController: Object.assign(OrderConfirmationController, OrderConfirmationController),
    JournalController: Object.assign(JournalController, JournalController),
    ContentPageController: Object.assign(ContentPageController, ContentPageController),
    AccountController: Object.assign(AccountController, AccountController),
    PaymentWebhookController: Object.assign(PaymentWebhookController, PaymentWebhookController),
}

export default Storefront