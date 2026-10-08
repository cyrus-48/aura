# AURA & OAK — COMPLETE IMPLEMENTATION GUIDE

### Laravel 13 + Vue 3 Starter Kit + Paysasa Payment Integration

---

## DOCUMENT PURPOSE

This guide is the single source of truth for turning the Aura & Oak HTML/Tailwind design system into a production-ready e-commerce platform. It assumes you already have the twelve static HTML pages (Home, Shop, Collections, Journal, Our Story, Contact, FAQ, Cart, Checkout, Account, Product Detail, Terms & Conditions) and the global footer component. Nothing in this document contains code. Every section describes **what** to build, **why** it matters, and **how** it should behave.

---

## PART 1 — FOUNDATION AND STACK DECISIONS

### 1.1 Core Stack

The application is built on Laravel 13 with the official Vue starter kit. This gives you Vue 3, Inertia.js, TypeScript, Tailwind CSS, and Laravel Fortify for authentication out of the box. Fortify handles login, registration, password reset, email verification, and two-factor authentication without requiring you to build any auth screens. Inertia.js is the bridge: your Laravel routes return Inertia responses that render Vue page components, so you write one codebase instead of separate API and frontend layers.

### 1.2 Why Inertia Instead of a Separate API

A traditional SPA with a separate REST or GraphQL API adds latency, doubles your validation logic, and complicates authentication. Inertia lets Laravel controllers pass typed props directly to Vue components. Form submissions go through Inertia's router, which handles CSRF tokens, validation errors, and redirects automatically. For an e-commerce site where SEO matters for product and journal pages, Inertia also supports server-side rendering if you enable it.

### 1.3 Package Dependencies

Beyond the starter kit, you need these Composer packages. Laravel Cashier is optional if you plan subscriptions, but it is not required for one-time orders. Spatie Laravel Sluggable generates URL-friendly slugs for products, collections, and journal posts. Spatie Laravel Permission handles admin roles so only authorized staff can manage inventory or view orders. Spatie Laravel Media Library manages product images with conversions and responsive srcsets. Spatie Laravel Settings stores store-wide configuration like currency, tax rate, and free-shipping threshold. Laravel Scout with a driver like Meilisearch powers the search bar in the header. Paysasa is the payment abstraction layer described in Part 6.

### 1.4 Directory Structure Philosophy

Organize the application by domain, not by file type. Everything related to orders lives under Orders. Everything related to the cart lives under Cart. Actions are single-purpose classes that do one thing — CreateOrder, PlaceOrder, CancelOrder, InitiatePayment. Services hold multi-step business logic that spans several actions. Events and Listeners decouple side effects like sending emails or updating inventory from the main request cycle. Enums replace magic strings for order statuses and payment statuses.

---

## PART 2 — DESIGN SYSTEM TRANSLATION

### 2.1 Tailwind Configuration

Your HTML mockups already define the Aura & Oak palette. The exact values are: background F2F5F3, sage DCE4DE, slate 2C3634, moss 5A6B65, and accent 8A9A8E. Register these as named colors in the Tailwind config so every Vue component references them by name instead of hex codes. This makes a future rebrand a one-line change.

### 2.2 Typography

Three typefaces are used. Playfair Display is the serif for all headings, product names, and editorial blocks. Inter is the sans-serif for body text, navigation, buttons, and form labels. The script typeface is reserved for decorative accents. Load all three through Google Fonts in the root Blade template so they are available before Vue mounts.

### 2.3 Reusable Component Inventory

Before building pages, extract these Vue components from the static HTML. The navigation bar becomes AppHeader with slots for the logo, desktop links, and icon cluster. The footer becomes AppFooter with props for the newsletter state. Product cards become ProductCard with props for image, name, price, compare-at price, and badges. Buttons become BaseButton with variants for primary, secondary, outline, and ghost. Form inputs become BaseInput, BaseSelect, and BaseTextarea with consistent focus rings and error states. Section headings become SectionHeading with props for eyebrow text and title.

### 2.4 Responsive Breakpoints

Your designs already follow a mobile-first philosophy. Preserve the exact breakpoints: one column on phones, two columns on small tablets, three columns on tablets, and four columns on desktop for product grids. The hero section stacks vertically on mobile and splits into two columns on desktop. The footer stacks into a single column on mobile and expands to three navigation columns on desktop.

### 2.5 Interaction Patterns

Every product card zooms its image on hover. Every button darkens or lightens on hover. The wishlist heart icon inverts colors when clicked. The mobile filter drawer slides in from the left. The FAQ accordion expands and rotates its plus icon. The cart quantity adjuster updates the line total instantly without a page reload — this is handled by Inertia's partial reload feature.

---

## PART 3 — DATABASE AND DOMAIN MODEL

### 3.1 Core Entities

The application revolves around ten tables. Products hold the catalog master data. Product Variants hold the color and size combinations with their own SKUs and stock counts. Categories group products into navigable collections. Carts hold session-based or user-based shopping sessions. Cart Items link variants to carts with quantities. Orders hold the finalized purchase record with totals and statuses. Order Items snapshot the product details at the moment of purchase so historical orders never change if a product is later edited. Addresses store shipping and billing destinations for each user. Inventory Movements log every stock change for auditability. Payments are handled by the Paysasa package, which writes its own transaction records.

### 3.2 Relationships

A Product belongs to one Category and has many Product Variants. A Cart belongs to either a User or a Session and has many Cart Items. A Cart Item belongs to a Cart and a Product Variant. An Order belongs to a User and has many Order Items. An Order Item belongs to an Order and a Product Variant. Addresses belong to a User and are referenced by Orders. Inventory Movements belong to a Product Variant.

### 3.3 Enums for Status Values

Never store statuses as raw strings. Create an OrderStatus enum with cases Pending, Confirmed, Processing, Shipped, Delivered, Cancelled, and Refunded. Create a PaymentStatus enum with cases Pending, Paid, Failed, and Refunded. Create a PaymentMethod enum with cases Mpesa, Airtel, Stripe, and Pesapal. Using enums gives you type safety, IDE autocomplete, and a single place to add new values.

### 3.4 Order State Machine

Orders move through a strict sequence. A Pending order can be confirmed or cancelled. A Confirmed order can be processed or cancelled. A Processing order can be shipped or cancelled. A Shipped order can be delivered. A Delivered order can be refunded. Any attempt to transition to an invalid state must throw an exception. Implement this with a state machine package or a simple transition map inside the OrderStatus enum.

### 3.5 Soft Deletes

Products, Orders, and Addresses use soft deletes. This means a deleted product still exists in the database for historical order references, but disappears from the catalog. Never hard-delete a product that has been ordered.

---

## PART 4 — AUTHENTICATION AND USER ROLES

### 4.1 Fortify Configuration

Fortify powers all authentication. Enable registration, password reset, email verification, and two-factor authentication. Disable features you do not need, such as profile photo uploads, to keep the surface area small. The Vue starter kit already provides the login, register, and password-reset pages styled with Tailwind. Restyle them to match the Aura & Oak palette by swapping the default gray and indigo classes for sage, slate, and moss.

### 4.2 User Roles

Three roles exist. Customer is the default role assigned on registration. Staff can view orders and update order statuses but cannot edit products or settings. Admin has full access including product management, settings, and refunds. Use Spatie Laravel Permission to define these roles and gate routes with middleware. Only Admin can access the product editor and the store settings page.

### 4.3 Guest Checkout

Guests can add items to a cart and proceed to checkout without creating an account. The cart is tied to a session identifier. When a guest completes checkout, either prompt them to create an account using their email, or create a silent account so their order history is available if they register later with the same email. This decision must be made explicitly and documented in the checkout flow.

### 4.4 Account Dashboard

The Account page shows three summary cards, a recent orders list, and editable profile fields. Customers can update their name, email, phone, and password. They can view order history with status badges. They can manage saved addresses. They can view and edit their wishlist. The dashboard must be fully responsive, with the sidebar collapsing into a horizontal tab bar on mobile.

---

## PART 5 — PRODUCT CATALOG AND SEARCH

### 5.1 Product Model

Every product has a name, slug, short description, full description, price, optional compare-at price, stock quantity at the variant level, active flag, category, and a set of materials and care instructions. Products are never deleted, only deactivated.

### 5.2 Variants

Each product has one or more variants. A variant represents a unique combination of color and size. The variant stores its own SKU, stock count, and price adjustment. The displayed price is the product base price plus the variant adjustment. When a customer selects a color and size on the product detail page, the system looks up the matching variant and shows its stock status.

### 5.3 Media Management

Use Spatie Laravel Media Library. Each product has one primary image and up to five gallery images. Generate three conversions: thumbnail at 300 pixels, medium at 800 pixels, and large at 1600 pixels. Serve WebP with a JPEG fallback. Store images on a CDN-backed disk. The product detail page gallery loads the large conversion and swaps to the medium conversion on slow connections.

### 5.4 Categories and Collections

Categories are hierarchical. Collections are flat, curated lists that can span categories — for example, a "New Arrivals" collection pulls products from any category tagged as new in the last thirty days. The Collections page shows editorial hero images for each collection with a link to the filtered shop view.

### 5.5 Search

Laravel Scout with Meilisearch powers the header search bar. Index product name, short description, and category name. Support typo tolerance and faceted filtering by category and price range. Show the top five results in a dropdown as the customer types, and a full results page on submit.

### 5.6 Product Detail Page

The product detail page is the most complex screen. It contains a thumbnail column, a main image, a title, a rating summary, a price with optional strikethrough, a short description, a color selector, a size selector, a quantity stepper, an Add to Bag button, a Buy It Now button, three trust badges, and a tabbed section for Description, Materials & Care, and Shipping & Returns. Below that, a You May Also Like grid shows four related products. Every interactive element must have a loading state so the customer knows the action is processing.

---

## PART 6 — PAYMENT INTEGRATION WITH PAYSASA

### 6.1 Understanding Paysasa

Paysasa is a driver-based payment abstraction built for the Kenyan market. It exposes one consistent facade — the Payment facade — and dispatches to whichever provider is configured. Supported drivers include M-Pesa, Airtel Money, T-Kash, Stripe, Pesapal, Flutterwave, Paystack, Google Pay, Apple Pay, and Kenyan bank rails like PesaLink, EFT, and RTGS. Every driver returns the same response shape, so your application code is written once and never touches a provider SDK directly.

### 6.2 Critical Prerequisite Before Installation

The GitHub repository at cyrus-48/paysasa is a source repository, not a published Composer package. Before you can run the install command, you must either fork the repository and publish it to Packagist under your own vendor name, or add a VCS repository entry to your project composer file pointing at the GitHub URL. This is a one-time setup step. Document it in your README so future developers know the package is not available on the public Packagist registry.

### 6.3 Installation Steps

Run the Composer require command with the correct vendor name. Then run the Paysasa install artisan command with the migrate flag. This publishes the configuration file, publishes the package migrations, runs them, and prints the credentials you need to set per provider. Review the published configuration file and remove any drivers you will not use to keep the surface area small.

### 6.4 Environment Variables

Set environment variables for each driver you enable. For M-Pesa, you need the consumer key, consumer secret, shortcode, and passkey. For Stripe, you need the publishable key, secret key, and webhook secret. For Airtel, you need the client ID and client secret. Never commit these values. Use the env file locally and your hosting provider's secret manager in production.

### 6.5 Payment Service Layer

Create a PaymentService class that wraps the Paysasa facade. The service exposes three methods: initiatePayment, handleCallback, and initiateRefund. initiatePayment takes an order, a driver name, and payment data such as the phone number. It calls the Paysasa facade, updates the order with the payment reference and status, and returns a normalized response. handleCallback receives the webhook payload, finds the matching order, and updates its status. initiateRefund calls the Paysasa refund method and marks the order as refunded if successful.

### 6.6 Synchronous vs Asynchronous Payments

Card payments through Stripe settle immediately. The Paysasa response returns successful right away, and the order can be marked as paid in the same request. Mobile money STK push and hosted checkout flows are asynchronous. The initial response returns pending, and the actual payment confirmation arrives later via webhook. Your application must handle both cases. Never assume a payment is complete until you receive either a successful synchronous response or a webhook confirming success.

### 6.7 Webhook Endpoint

Create a single webhook controller route that accepts a driver parameter. The route must be excluded from CSRF protection because payment providers cannot send a CSRF token. Inside the controller, verify the webhook signature using the driver-specific secret. Extract the payment reference from the payload. Find the matching order. If the payment succeeded, mark the order as confirmed and fire the PaymentConfirmed event. If it failed, mark the payment status as failed. Always return a 200 response so the provider does not retry unnecessarily.

### 6.8 Webhook Signature Verification

Every provider signs its webhooks differently. M-Pesa sends a callback with a result code. Stripe sends a Stripe-Signature header you must verify with the webhook secret. Pesapal and Flutterwave use their own signature schemes. The Paysasa package handles verification internally if you configure it correctly. Do not bypass verification in production. A forged webhook can mark an unpaid order as paid.

### 6.9 Idempotency

Payment providers may send the same webhook more than once. Your handler must be idempotent. Before updating an order, check whether it is already in the target state. If the order is already marked as paid and you receive another success webhook, do nothing and return 200. Paysasa provides idempotency keys you should store and check.

### 6.10 Failed Payment Handling

If a payment fails, keep the order in Pending status and release any reserved inventory after a timeout. Notify the customer by email with a link to retry payment. Do not cancel the order immediately — give the customer twenty-four hours to complete payment before automatically cancelling and releasing stock.

### 6.11 Refunds

Refunds are initiated from the admin panel. The admin selects an order, enters the refund amount, and confirms. The PaymentService calls the Paysasa refund method with the original transaction reference. If the refund succeeds, the order status moves to Refunded and an email is sent to the customer. Partial refunds are supported.

### 6.12 Alternative Payment Package

If Paysasa is not production-ready, consider PayZephyr instead. It supports eight providers with automatic failover, double-charge protection, and signed webhooks, and it is already published on Packagist. The architectural patterns in this guide work with either package. The only differences are the facade method names and configuration keys.

---

## PART 7 — CART AND CHECKOUT FLOW

### 7.1 Cart Behavior

The cart is session-based for guests and user-based for authenticated customers. When a guest logs in, their session cart merges into their user cart. If the same variant exists in both, quantities are summed and capped at the available stock. The cart recalculates totals on every change. The cart persists across browser sessions if the user is authenticated.

### 7.2 Add to Cart

Adding a variant checks stock availability first. If the requested quantity exceeds available stock, show a clear error. Otherwise, create or update the cart item and return the updated cart summary. The header cart icon updates its badge count without a page reload.

### 7.3 Cart Page

The cart page shows a table of items with image, product name, variant name, unit price, quantity stepper, line total, and a remove link. Below the items, a promo code input and an update cart button. On the right, a sticky order summary card shows subtotal, shipping, tax, and total, with a secure checkout button and payment method icons. The summary card includes trust badges for carbon-neutral shipping, 45-day returns, and secure payment.

### 7.4 Checkout Flow

Checkout is a three-step process. Step one collects contact information and shipping address. Step two selects a shipping method. Step three collects payment information. A progress indicator at the top shows which step the customer is on. The right sidebar shows a persistent order summary with the cart contents, subtotal, shipping, tax, and total. The customer can collapse the order summary on mobile to focus on the form.

### 7.5 Guest Checkout

Guests can check out without an account. At the end of checkout, offer a checkbox to create an account with the email they used. If they decline, the order is still recorded and associated with their email so they can claim it later by registering with the same email.

### 7.6 Address Validation

Validate addresses on the server side. Required fields are first name, last name, address line one, city, postal code, and country. Phone is required for mobile money payments. Email is required for order confirmation. Use Laravel's validation rules and return clear error messages inline next to each field.

### 7.7 Shipping Methods

Offer two shipping methods. Standard carbon-neutral shipping is free on orders over ninety-nine dollars and otherwise costs a flat rate. Express shipping costs a fixed fee and delivers in one to two business days. Shipping costs are calculated server-side and never trusted from the client.

### 7.8 Tax Calculation

Tax is calculated server-side based on the shipping address. For Kenya, apply sixteen percent VAT. For international orders, apply zero tax and note that customs duties may apply on arrival. Store the tax rate in Spatie Laravel Settings so it can be changed without a deploy.

### 7.9 Order Confirmation

After successful payment, redirect the customer to an order confirmation page. This page shows the order number, a summary of items, the shipping address, the payment method, and an estimated delivery window. Send a confirmation email immediately. The email must include the same information plus a tracking link placeholder that populates once the order ships.

---

## PART 8 — ORDER MANAGEMENT AND INVENTORY

### 8.1 Order Lifecycle

An order is created when the customer completes the checkout form. At that moment, the order is in Pending status with payment status Pending. Inventory is reserved immediately to prevent overselling. When payment is confirmed, the order moves to Confirmed. Staff then mark it as Processing, then Shipped, then Delivered. If the customer cancels before shipping, the order moves to Cancelled and inventory is released.

### 8.2 Inventory Reservation

Inventory is reserved at order placement, not at payment confirmation. This prevents two customers from buying the same last item while payment is pending. Reserve inventory inside a database transaction with row-level locking to avoid race conditions. If payment fails or the order is cancelled, release the reserved inventory.

### 8.3 Inventory Movements Log

Every stock change is logged in an inventory movements table. Each row records the product variant, the change amount, the reason, and a reference to the order or admin action. This gives you a full audit trail and makes it easy to reconcile stock discrepancies.

### 8.4 Low Stock Alerts

When a variant's stock drops below a configurable threshold, send an email to the admin. The threshold is stored in Spatie Laravel Settings. Staff can also view a low-stock report in the admin panel.

### 8.5 Admin Order Management

The admin panel lists all orders with filters for status, payment status, date range, and customer. Clicking an order opens a detail view with the full order information, a timeline of status changes, and action buttons to change status, add tracking numbers, issue refunds, and resend confirmation emails.

### 8.6 Order Status Emails

Send an email every time the order status changes. The customer receives a confirmation email on placement, a shipped email with tracking when the order ships, and a delivered email when the order is marked delivered. All emails use a consistent Aura & Oak template with the sage and slate palette.

---

## PART 9 — ADMIN PANEL

### 9.1 Admin Access

Only users with the Admin role can access the admin panel. The panel lives under a dedicated route prefix. Use a separate Inertia layout for admin pages so the customer-facing header and footer are not shown.

### 9.2 Product Management

Admins can create, edit, and deactivate products. The product editor includes fields for name, slug, descriptions, category, price, compare-at price, and images. Below the product fields, a variants repeater lets admins add color and size combinations with their own SKUs, stock counts, and price adjustments.

### 9.3 Category Management

Admins can create and edit categories. Categories have a name, slug, parent category, and optional image. The category tree is displayed as a nested list.

### 9.4 Collection Management

Admins can create collections, which are curated lists of products. A collection has a name, slug, description, hero image, and an ordered list of products. Collections appear on the Collections page.

### 9.5 Order Management

Admins can view, filter, and update orders. Status changes are logged with the admin's user ID and a timestamp. Admins can add internal notes to orders. Admins can issue full or partial refunds.

### 9.6 Customer Management

Admins can view a list of customers with their order counts and total spend. Clicking a customer shows their order history and contact information.

### 9.7 Settings

Admins can edit store-wide settings including currency, tax rate, free-shipping threshold, low-stock threshold, and the admin notification email. Settings are stored in Spatie Laravel Settings and cached for performance.

### 9.8 Journal Management

Admins can create and edit journal posts. Each post has a title, slug, excerpt, body, featured image, category, and publish date. The Journal page on the storefront reads from the same table.

---

## PART 10 — EVENTS, LISTENERS, AND QUEUES

### 10.1 Event-Driven Decoupling

Side effects are handled by events and listeners so the main request stays fast. When an order is placed, fire an OrderPlaced event. When payment is confirmed, fire a PaymentConfirmed event. When an order ships, fire an OrderShipped event.

### 10.2 Listeners

The OrderPlaced event triggers two listeners. SendOrderConfirmation queues an email to the customer. NotifyAdminOfNewOrder queues an email to the admin. The PaymentConfirmed event triggers SendPaymentReceipt and UpdateOrderStatus. The OrderShipped event triggers SendShippingNotification.

### 10.3 Queue Configuration

All email and notification listeners run on a queue. Use Redis as the queue driver. Run at least two queue workers in production with a supervisor or a process manager. Monitor failed jobs and set up alerts.

### 10.4 Webhook Processing Queue

Webhook processing can be slow if it involves external verification. Dispatch webhook handling to a queue job so the HTTP response returns immediately and the provider does not time out. Store the raw webhook payload in the database first, then process it in the background. This gives you a replay capability if processing fails.

---

## PART 11 — SECURITY AND PERFORMANCE

### 11.1 Security Checklist

Enable CSRF protection on all forms except webhook endpoints. Use HTTPS everywhere and set the secure cookie flag. Hash passwords with bcrypt or argon2. Rate-limit login attempts. Rate-limit the payment initiation endpoint to prevent abuse. Validate and sanitize every input on the server side. Never trust prices or totals sent from the client. Escape all output in Blade and Vue. Use Content Security Policy headers to prevent XSS. Store secrets in environment variables, never in the repository. Run composer audit and npm audit regularly.

### 11.2 PCI Compliance

Never store raw card numbers. Card data goes directly to Stripe via their JavaScript library. Your server only sees a payment method token. This keeps your PCI scope minimal. For mobile money, you store only the phone number and the transaction reference, never the PIN or any sensitive credentials.

### 11.3 Performance Optimization

Cache product listings, category trees, and collection data with Redis. Use Laravel's response cache middleware for anonymous storefront pages. Eager-load relationships to avoid N+1 queries. Paginate all listings. Use database indexes on foreign keys, slugs, and status columns. Serve images from a CDN. Enable HTTP/2 and Brotli compression. Use Laravel Octane with Swoole or RoadRunner in production for significant throughput gains.

### 11.4 Database Indexing

Add indexes on the products table for slug and is_active. Add indexes on the product variants table for sku and product_id. Add indexes on the orders table for order_number, user_id, status, and payment_status. Add indexes on the cart items table for cart_id and product_variant_id. Add indexes on the inventory movements table for product_variant_id and created_at.

### 11.5 Rate Limiting

Apply rate limits to the search endpoint, the cart add endpoint, and the payment initiation endpoint. Use Laravel's built-in rate limiter. Return a 429 response with a clear message when the limit is exceeded.

---

## PART 12 — TESTING STRATEGY

### 12.1 Unit Tests

Test every Action class in isolation. Test the CartService merge logic. Test the InventoryService reserve and release methods. Test the OrderStatus state machine transitions. Test the PaymentService normalization of Paysasa responses.

### 12.2 Feature Tests

Test the full add-to-cart flow from HTTP request to database state. Test the checkout flow end to end with a fake payment driver. Test the webhook handler with sample payloads from each provider. Test that unauthorized users cannot access admin routes. Test that guests can check out and that their order is associated with their email.

### 12.3 Payment Tests

Use Paysasa's fake method to test payment flows without hitting real providers. Assert that the correct driver was called with the correct amount. Assert that the order was updated with the payment reference. Assert that the correct events were dispatched.

### 12.4 Browser Tests

Use Laravel Dusk or Playwright to test the full purchase flow in a real browser. Add an item to the cart, proceed to checkout, fill the form, select a payment method, complete the payment with a fake driver, and verify the order confirmation page. Test the responsive layout at three breakpoints.

### 12.5 Test Data

Use factories to generate products, variants, orders, and users. Seed a realistic catalog with at least fifty products across five categories. Seed a few hundred orders with varied statuses to test the admin filters.

---

## PART 13 — DEPLOYMENT AND OPERATIONS

### 13.1 Server Requirements

Use a Linux server with PHP 8.3 or later, Composer 2, Node 20, MySQL 8 or PostgreSQL 15, and Redis 7. Provision at least two CPU cores and four gigabytes of RAM for a small store. Scale vertically or horizontally as traffic grows.

### 13.2 Environment Configuration

Set APP_ENV to production, APP_DEBUG to false, and APP_URL to the canonical HTTPS URL. Configure the database, cache, queue, and session drivers to use Redis. Configure the mail driver to use a transactional email service like Postmark or Mailgun. Configure the filesystem to use S3 or a similar object store for product images.

### 13.3 Deployment Pipeline

Use a CI/CD pipeline that runs the test suite, runs Laravel Pint for code style, runs Larastan for static analysis, builds the frontend assets, and deploys to the server. Use zero-downtime deployment with Laravel Envoy or a tool like Deployer. Run migrations automatically but always test them against a staging database first.

### 13.4 Backup and Recovery

Back up the database daily and store backups off-site. Back up uploaded product images weekly. Test the restore process quarterly. Document the recovery procedure in your runbook.

### 13.5 Monitoring

Use a monitoring service like Sentry or Flare for error tracking. Use Laravel Telescope in staging to debug slow queries and failed jobs. Use a uptime monitor to alert you when the site goes down. Set up alerts for failed queue jobs, failed payments, and low stock.

### 13.6 Logging

Log all order placements, payment initiations, webhook receipts, and status changes. Use structured logging with context. Never log sensitive data like card numbers or API secrets.

---

## PART 14 — IMPLEMENTATION ROADMAP

### 14.1 Phase One — Foundation (Week One)

Set up the Laravel project with the Vue starter kit. Configure the Tailwind palette and typography. Install Spatie packages. Set up the database schema with migrations. Seed a small catalog. Build the AppHeader, AppFooter, BaseButton, BaseInput, and ProductCard components.

### 14.2 Phase Two — Catalog (Week Two)

Build the Home page, Shop page, Collections page, and Product Detail page. Wire up the search bar with Laravel Scout. Implement product filtering and sorting. Implement the wishlist.

### 14.3 Phase Three — Cart and Checkout (Week Three)

Build the Cart page with live quantity updates. Build the three-step Checkout flow. Implement the Order placement action. Implement inventory reservation. Build the Order Confirmation page.

### 14.4 Phase Four — Payments (Week Four)

Install and configure Paysasa. Build the PaymentService. Implement the webhook endpoint. Test with a sandbox M-Pesa account and a Stripe test account. Handle all edge cases: failed payment, duplicate webhook, timeout, refund.

### 14.5 Phase Five — Account and Admin (Week Five)

Build the Account dashboard. Build the admin panel for products, categories, collections, orders, customers, and settings. Build the Journal management screens.

### 14.6 Phase Six — Content and Polish (Week Six)

Build the Journal, Our Story, Contact, FAQ, and Terms pages. Wire up all forms. Add email templates. Add loading states and error states to every interactive element. Test on real devices.

### 14.7 Phase Seven — Testing and Launch (Week Seven)

Write feature tests for the full purchase flow. Write unit tests for every service and action. Run a full security audit. Run a performance audit with Lighthouse. Fix all issues. Deploy to staging. Run a soft launch with a small group of users. Fix any issues. Deploy to production.

---

## PART 15 — APPENDIX

### 15.1 Design Token Reference

Background F2F5F3. Sage DCE4DE. Slate 2C3634. Moss 5A6B65. Accent 8A9A8E. Serif Playfair Display. Sans Inter. Script Great Vibes.

### 15.2 Route Map

Public routes: home, shop, collections, collection detail, product detail, journal, journal post, our story, contact, faq, terms, cart, checkout, order confirmation. Authenticated routes: account dashboard, account orders, account addresses, account settings, wishlist. Admin routes: dashboard, products, categories, collections, orders, customers, journal, settings.

### 15.3 Payment Driver Map

M-Pesa for Kenya mobile money. Airtel Money for Kenya mobile money. Stripe for international cards. Pesapal for East Africa hosted checkout. Flutterwave for pan-African cards. Paystack for Nigerian cards. PesaLink for Kenyan bank transfers. RTGS for high-value Kenyan bank transfers.

### 15.4 Common Pitfalls to Avoid

Do not trust prices from the client. Do not skip webhook signature verification. Do not store card numbers. Do not release inventory before payment fails. Do not use raw status strings. Do not forget to index foreign keys. Do not skip loading states. Do not forget mobile testing. Do not deploy without a rollback plan. Do not skip backups.

### 15.5 Glossary

STK Push — SIM Toolkit Push, the M-Pesa flow where a payment prompt is sent to the customer's phone. C2B — Customer to Business, a payment from a customer to a business. B2C — Business to Customer, a payout from a business to a customer. Idempotency — the property that repeating an operation has the same effect as performing it once. Webhook — an HTTP callback from a payment provider to your server notifying you of an event. Driver — a pluggable adapter that implements a common interface for a specific provider. Facade — a Laravel pattern that provides a static interface to a class in the service container.

---

## END OF GUIDE

Save this document as AURA-AND-OAK-IMPLEMENTATION-GUIDE.md. Keep it in the repository root so every developer can read it before contributing. Update it whenever the architecture changes.
