<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\Category\CategoryDestroyController;
use App\Http\Controllers\Admin\Category\CategoryIndexController;
use App\Http\Controllers\Admin\Category\CategoryStoreController;
use App\Http\Controllers\Admin\Category\CategoryUpdateController;
use App\Http\Controllers\Admin\Collection\CollectionCreateController;
use App\Http\Controllers\Admin\Collection\CollectionDestroyController;
use App\Http\Controllers\Admin\Collection\CollectionEditController;
use App\Http\Controllers\Admin\Collection\CollectionIndexController;
use App\Http\Controllers\Admin\Collection\CollectionStoreController;
use App\Http\Controllers\Admin\Collection\CollectionUpdateController;
use App\Http\Controllers\Admin\Content\MediaLibraryController;
use App\Http\Controllers\Admin\Content\MediaUploadController;
use App\Http\Controllers\Admin\Content\PageContentController;
use App\Http\Controllers\Admin\Customer\CustomerDetailController;
use App\Http\Controllers\Admin\Customer\CustomerIndexController;
use App\Http\Controllers\Admin\Customer\CustomerNoteController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Discount\DiscountDestroyController;
use App\Http\Controllers\Admin\Discount\DiscountIndexController;
use App\Http\Controllers\Admin\Discount\DiscountStoreController;
use App\Http\Controllers\Admin\Discount\DiscountUpdateController;
use App\Http\Controllers\Admin\Inventory\InventoryAdjustController;
use App\Http\Controllers\Admin\Inventory\InventoryIndexController;
use App\Http\Controllers\Admin\Inventory\InventoryMovementsController;
use App\Http\Controllers\Admin\Journal\JournalCreateController;
use App\Http\Controllers\Admin\Journal\JournalDestroyController;
use App\Http\Controllers\Admin\Journal\JournalEditController;
use App\Http\Controllers\Admin\Journal\JournalIndexController;
use App\Http\Controllers\Admin\Journal\JournalStoreController;
use App\Http\Controllers\Admin\Journal\JournalUpdateController;
use App\Http\Controllers\Admin\Order\OrderDetailController;
use App\Http\Controllers\Admin\Order\OrderIndexController;
use App\Http\Controllers\Admin\Order\OrderNoteController;
use App\Http\Controllers\Admin\Order\OrderStatusController;
use App\Http\Controllers\Admin\Payment\PaymentIndexController;
use App\Http\Controllers\Admin\Product\ProductBulkController;
use App\Http\Controllers\Admin\Product\ProductCreateController;
use App\Http\Controllers\Admin\Product\ProductDestroyController;
use App\Http\Controllers\Admin\Product\ProductDuplicateController;
use App\Http\Controllers\Admin\Product\ProductEditController;
use App\Http\Controllers\Admin\Product\ProductIndexController;
use App\Http\Controllers\Admin\Product\ProductStoreController;
use App\Http\Controllers\Admin\Product\ProductUpdateController;
use App\Http\Controllers\Admin\Setting\StoreSettingIndexController;
use App\Http\Controllers\Admin\Setting\StoreSettingUpdateController;
use App\Http\Controllers\Admin\Staff\StaffDestroyController;
use App\Http\Controllers\Admin\Staff\StaffIndexController;
use App\Http\Controllers\Admin\Staff\StaffStoreController;
use App\Http\Controllers\Storefront\AccountController;
use App\Http\Controllers\Storefront\CartController;
use App\Http\Controllers\Storefront\CheckoutController;
use App\Http\Controllers\Storefront\CollectionController;
use App\Http\Controllers\Storefront\ContentPageController;
use App\Http\Controllers\Storefront\HomeController;
use App\Http\Controllers\Storefront\JournalController;
use App\Http\Controllers\Storefront\OrderConfirmationController;
use App\Http\Controllers\Storefront\ProductController;
use App\Http\Controllers\Storefront\ShopController;
use Illuminate\Support\Facades\Route;

// Public Storefront Catalog
Route::get('/', HomeController::class)->name('home');
Route::get('/shop', ShopController::class)->name('shop');
Route::get('/collections', [CollectionController::class, 'index'])->name('collections.index');
Route::get('/collections/{collection:slug}', [CollectionController::class, 'show'])->name('collections.show');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

// Shopping Cart Routes
Route::prefix('cart')->name('cart.')->group(function (): void {
    Route::get('/', [CartController::class, 'index'])->name('index');
    Route::post('/', [CartController::class, 'store'])->name('store');
    Route::patch('/{item}', [CartController::class, 'update'])->name('update');
    Route::delete('/{item}', [CartController::class, 'destroy'])->name('destroy');
});

// Checkout & Order Routes
Route::get('/checkout', [CheckoutController::class, 'create'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/orders/{order:order_number}/confirmation', [OrderConfirmationController::class, 'show'])->name('orders.confirmation');

// Editorial Journal Routes
Route::get('/journal', [JournalController::class, 'index'])->name('journal.index');
Route::get('/journal/{post:slug}', [JournalController::class, 'show'])->name('journal.show');

// Brand & Editorial Content Pages
Route::get('/our-story', [ContentPageController::class, 'ourStory'])->name('story');
Route::get('/contact', [ContentPageController::class, 'contact'])->name('contact.index');
Route::post('/contact', [ContentPageController::class, 'submitContact'])->name('contact.store');
Route::get('/faq', [ContentPageController::class, 'faq'])->name('faq');
Route::get('/terms', [ContentPageController::class, 'terms'])->name('terms');

// Authenticated Customer Area
Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('/account', [AccountController::class, 'index'])->name('account.index');
    Route::post('/account/orders/{order:order_number}/cancel', [AccountController::class, 'cancelOrder'])->name('account.orders.cancel');
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
});

// Atelier Admin Panel
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'staff'])->group(function (): void {
    Route::get('/', DashboardController::class)->name('dashboard');

    // Products Management
    Route::prefix('products')->name('products.')->group(function (): void {
        Route::get('/', ProductIndexController::class)->name('index');
        Route::get('/create', ProductCreateController::class)->name('create');
        Route::post('/', ProductStoreController::class)->name('store');
        Route::get('/{product}/edit', ProductEditController::class)->name('edit');
        Route::put('/{product}', ProductUpdateController::class)->name('update');
        Route::delete('/{product}', ProductDestroyController::class)->name('destroy');
        Route::post('/{product}/duplicate', ProductDuplicateController::class)->name('duplicate');
        Route::post('/bulk', ProductBulkController::class)->name('bulk');
    });

    // Categories Management
    Route::prefix('categories')->name('categories.')->group(function (): void {
        Route::get('/', CategoryIndexController::class)->name('index');
        Route::post('/', CategoryStoreController::class)->name('store');
        Route::put('/{category}', CategoryUpdateController::class)->name('update');
        Route::delete('/{category}', CategoryDestroyController::class)->name('destroy');
    });

    // Collections Management
    Route::prefix('collections')->name('collections.')->group(function (): void {
        Route::get('/', CollectionIndexController::class)->name('index');
        Route::get('/create', CollectionCreateController::class)->name('create');
        Route::post('/', CollectionStoreController::class)->name('store');
        Route::get('/{collection}/edit', CollectionEditController::class)->name('edit');
        Route::put('/{collection}', CollectionUpdateController::class)->name('update');
        Route::delete('/{collection}', CollectionDestroyController::class)->name('destroy');
    });

    // Inventory Management
    Route::prefix('inventory')->name('inventory.')->group(function (): void {
        Route::get('/', InventoryIndexController::class)->name('index');
        Route::post('/adjust', InventoryAdjustController::class)->name('adjust');
        Route::get('/{variant}/movements', InventoryMovementsController::class)->name('movements');
    });

    // Orders Management
    Route::prefix('orders')->name('orders.')->group(function (): void {
        Route::get('/', OrderIndexController::class)->name('index');
        Route::get('/{order}', OrderDetailController::class)->name('show');
        Route::patch('/{order}/status', OrderStatusController::class)->name('status');
        Route::post('/{order}/notes', OrderNoteController::class)->name('notes.store');
    });

    // Customers Management
    Route::prefix('customers')->name('customers.')->group(function (): void {
        Route::get('/', CustomerIndexController::class)->name('index');
        Route::get('/{user}', CustomerDetailController::class)->name('show');
        Route::post('/{user}/notes', CustomerNoteController::class)->name('notes.store');
    });

    // Discounts Management
    Route::prefix('discounts')->name('discounts.')->group(function (): void {
        Route::get('/', DiscountIndexController::class)->name('index');
        Route::post('/', DiscountStoreController::class)->name('store');
        Route::put('/{discount}', DiscountUpdateController::class)->name('update');
        Route::delete('/{discount}', DiscountDestroyController::class)->name('destroy');
    });

    // Payments Management
    Route::prefix('payments')->name('payments.')->group(function (): void {
        Route::get('/', PaymentIndexController::class)->name('index');
    });

    // Journal Management
    Route::prefix('journal')->name('journal.')->group(function (): void {
        Route::get('/', JournalIndexController::class)->name('index');
        Route::get('/create', JournalCreateController::class)->name('create');
        Route::post('/', JournalStoreController::class)->name('store');
        Route::get('/{post}/edit', JournalEditController::class)->name('edit');
        Route::put('/{post}', JournalUpdateController::class)->name('update');
        Route::delete('/{post}', JournalDestroyController::class)->name('destroy');
    });

    // Content Pages Management
    Route::get('/pages', [PageContentController::class, 'index'])->name('pages.index');

    // Media Library
    Route::get('/media', [MediaLibraryController::class, 'index'])->name('media.index');
    Route::post('/media/upload', MediaUploadController::class)->name('media.upload');

    // Store Settings
    Route::get('/settings', StoreSettingIndexController::class)->name('settings.index');
    Route::put('/settings', StoreSettingUpdateController::class)->name('settings.update');

    // Staff Management
    Route::prefix('staff')->name('staff.')->group(function (): void {
        Route::get('/', StaffIndexController::class)->name('index');
        Route::post('/', StaffStoreController::class)->name('store');
        Route::delete('/{user}', StaffDestroyController::class)->name('destroy');
    });
});

require __DIR__.'/settings.php';
