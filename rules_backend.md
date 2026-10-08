# LARAVEL BACKEND — MANDATORY ENGINEERING RULES
### Aura & Oak · Laravel 13 · Inertia.js · Vue 3 · PHP 8.3+ · MySQL/PostgreSQL · Redis

These rules govern every controller, every action, every model, every migration, every form request, every policy, every event, every listener, every job, and every test in the backend. They are non-negotiable. A pull request that violates any rule is rejected. There are no exceptions.

The stack is **Laravel + Inertia + Vue**. There is no separate JSON API. Every page response goes through Inertia. Controllers return `Inertia::render()`, not `response()->json()`. The rules below reflect this architecture.

---

## RULE 1 — ONE CONTROLLER METHOD, ONE RESPONSIBILITY

Every controller method does exactly one thing: authorize, validate, delegate, and render. It does not contain business logic. It does not query the database directly. It does not send emails. It does not call external APIs.

**Maximum method length:** 20 lines of code.

**Allowed inside a controller method:**
- A call to `$this->authorize()`.
- A call to a Form Request's `validated()` method.
- A call to an Action class.
- A call to `return Inertia::render('Page', [...props])`.
- A call to `return redirect()->route(...)`.
- A call to `return back()->with('success', '...')`.

**Forbidden inside a controller method:**
- `DB::transaction()` blocks longer than three lines.
- `Mail::send()`, `Notification::send()`, or any synchronous side effect.
- Direct model queries beyond a single `findOrFail` or route-model binding.
- `if` / `else` chains longer than two branches.
- Hand-built arrays passed to Inertia instead of using API Resources.

**Test:** If a controller method cannot be described in one sentence, it is doing too much. Extract the work into an Action.

---

## RULE 2 — ACTIONS OWN BUSINESS LOGIC

Every distinct business operation lives in an Action class inside `app/Actions/`. An Action is a single-purpose, single-method class that does one thing and returns a result.

**Naming:** `CreateOrderAction`, `PlaceOrderAction`, `CancelOrderAction`, `InitiatePaymentAction`, `VerifyPaymentAction`, `SendOrderConfirmationAction`.

**Structure:** Every Action has an `execute()` method that accepts typed arguments and returns a typed result. Actions never accept a `Request` object. Actions never return an Inertia response. Actions never call `redirect()` or `Inertia::render()`.

**Rules:**
- An Action is invokable or has a single public `execute` method.
- An Action receives its dependencies through the constructor using Laravel's service container.
- An Action wraps its work in a `DB::transaction()` if it performs more than one write.
- An Action fires events at the end, not in the middle.
- An Action throws domain exceptions on failure, not generic `\Exception`.
- An Action returns a domain model or a plain value object, never an HTTP response.

**Test:** Every Action has a feature test that verifies its behavior in isolation.

---

## RULE 3 — DOMAIN EXCEPTIONS ARE EXPLICIT

Never throw `\Exception`. Never throw `\RuntimeException`. Throw domain-specific exceptions that live inside `app/Exceptions/`.

**Approved exception classes:** `InsufficientStockException`, `OrderAlreadyPaidException`, `PaymentFailedException`, `InvalidStatusTransitionException`, `CartEmptyException`.

**Rules:**
- Every exception extends a base `DomainException`.
- Every exception has a static factory method for common cases, such as `InsufficientStockException::for($variant, $requested)`.
- Every exception has a human-readable message suitable for display or logging.
- Every exception is caught in a controller or a middleware and converted to a user-facing response. In an Inertia app, this means `return back()->withErrors(...)` or a redirect with a flash message.

**Forbidden:** `throw new \Exception('Something went wrong')`. `throw new \Exception($message)`. Any exception without a typed class.

---

## RULE 4 — ENUMS REPLACE MAGIC STRINGS

Every status, type, role, or category with a fixed set of values is a PHP enum inside `app/Enums/`. The enum is the single source of truth.

**Required enums:** `OrderStatus`, `PaymentStatus`, `PaymentMethod`, `ShippingMethod`, `UserRole`, `AddressType`.

**Rules:**
- Every enum is a backed enum (string or int).
- Every enum implements a `label()` method returning a human-readable string.
- Every enum implements a `color()` method returning a Tailwind class for badge rendering in Vue.
- Every enum is cast on its model using the `casts()` method.
- Every enum's values match the database column's allowed values.

**Forbidden:** Raw strings such as `'pending'` in a controller. Comparisons such as `if ($order->status === 'paid')`. Use `if ($order->status === OrderStatus::Paid)`.

**Why:** When you add a new status, you update the enum. Every switch statement, every badge, every filter picks it up automatically. The Inertia prop carries the label and color from the backend, so the Vue component never hardcodes them.

---

## RULE 5 — MODELS ARE THIN

A model represents a database table and defines its relationships, casts, scopes, and accessors. It does not contain business logic. It does not fire events in the middle of a save. It does not send emails. It does not call external services.

**Allowed inside a model:**
- `$fillable` or `$guarded` — prefer `$fillable` with explicit fields.
- `$casts` — including enum casts, date casts, and JSON casts.
- Relationship methods (`belongsTo`, `hasMany`, `hasOne`, `belongsToMany`).
- Local scopes (`scopeActive`, `scopePending`).
- Accessors and mutators (`Attribute::make()`).
- Small helper methods such as `isPaid()`, `isCancelled()`, `canBeRefunded()`.

**Forbidden inside a model:**
- Queries to other models beyond relationship definitions.
- Calls to `Mail`, `Notification`, `Http`, `Storage`, `Cache`, or `Queue`.
- Business logic longer than five lines.
- `booted()` methods that perform side effects.

**Maximum model size:** 250 lines. If a model exceeds this, extract logic into an Action or a dedicated service.

---

## RULE 6 — MIGRATIONS ARE NEVER EDITED AFTER MERGE

Once a migration has been merged to `main` and deployed to any environment, it is immutable. Any change requires a new migration.

**Rules:**
- Every migration has a `down()` method that reverses `up()`.
- Every migration uses the schema builder (`Schema::create`, `Schema::table`).
- Every foreign key uses `constrained()->cascadeOnDelete()` or explicitly defines `onDelete('restrict')`. Never leave the constraint implicit.
- Every column has an explicit type, nullability, and default where applicable.
- Every index is added deliberately. Foreign keys are indexed automatically by `constrained()`. Slugs, statuses, and lookup columns require explicit indexes.
- Every migration is tested against a fresh database before merge.

**Forbidden:** `DB::statement()` unless the change cannot be expressed in the schema builder. If used, a comment explains why. Dropping columns in the same migration that adds new ones — split them. Editing a migration after merge.

---

## RULE 7 — FORM REQUESTS VALIDATE EVERYTHING

Every POST, PUT, PATCH, and DELETE request is validated by a dedicated Form Request class inside `app/Http/Requests/`. Never validate in the controller. Never validate in the model. Never validate in middleware.

**Naming:** `StoreProductRequest`, `UpdateProductRequest`, `StoreOrderRequest`, `InitiatePaymentRequest`, `UpdateProfileRequest`.

**Rules:**
- Every Form Request defines an `authorize()` method returning a boolean, even if it always returns `true`. This documents intent.
- Every Form Request defines a `rules()` method returning an array using array syntax, not pipe syntax.
- Every Form Request defines a `messages()` method when custom error messages improve clarity.
- Every Form Request defines a `prepareForValidation()` method when input needs normalization (trimming strings, casting phone numbers, lowercasing emails).
- Every rule is explicit. `required|string|max:255` is fine. `sometimes` is used only when genuinely conditional.

**Forbidden:** `$request->validate([...])` in a controller. Validation logic in a model. Regex rules without a comment explaining the pattern.

**Why it matters in Inertia:** When validation fails, Inertia automatically redirects back with the errors in the session. The Vue form receives them via `useForm().errors` and displays them inline. Never intercept validation errors manually — let Inertia handle the round trip.

---

## RULE 8 — POLICIES GATE EVERY MODEL ACTION

Every action that depends on the authenticated user's identity is gated by a Policy. This includes viewing an order, updating an address, deleting a wishlist item, and cancelling a subscription.

**Naming:** `OrderPolicy`, `AddressPolicy`, `WishlistPolicy`, `ProductPolicy`.

**Rules:**
- Every Policy has a corresponding model.
- Every Policy method returns a `Response` object or a boolean. Prefer `Response::allow()` and `Response::deny('reason')` for clarity.
- Every Policy has a corresponding test in `tests/Feature/Policies/`.
- Every Policy method uses `$user->id === $model->user_id` for ownership checks. Never use `$user->is($model->user)` unless the model's user relationship is loaded.

**Forbidden:** `if ($user->id === $order->user_id)` inside a controller. Inline authorization logic. Bypassing the Policy for admin users — admins get their own gate via a `before()` method on the Policy.

---

## RULE 9 — INERTIA PROPS USE API RESOURCES

Even though there is no JSON API, every Inertia prop passed to Vue must come from an API Resource. This keeps the shape of the data consistent, decouples the Vue component from the database schema, and gives you a single place to control what the frontend sees.

**Naming:** `ProductResource`, `ProductVariantResource`, `OrderResource`, `OrderItemResource`, `AddressResource`, `UserResource`.

**Rules:**
- Every Resource extends `JsonResource`.
- Every Resource declares an explicit `toArray()` method.
- Every Resource includes the model's `id`, `created_at`, and `updated_at` where relevant.
- Every Resource omits sensitive fields such as password hashes, API tokens, and internal notes.
- Every Resource uses `whenLoaded()` for relationships that may or may not be eager-loaded.
- Every Resource uses `when()` for fields that are conditionally present based on the request context.
- Every enum field is transformed using `label()` and `color()` methods so the Vue component receives display-ready values.

**Forbidden:** `return Inertia::render('Orders', ['orders' => $orders]);` with raw models. `return Inertia::render('Orders', ['orders' => $orders->toArray()]);`. Hand-built arrays in a controller.

**Why:** The Vue component should never know what a database column is called. It should receive `statusLabel`, `statusColor`, and `paymentStatusLabel`. If the schema changes, only the Resource changes.

---

## RULE 10 — EAGER LOAD EVERYTHING

Every query whose result is passed to Inertia must eager-load its relationships using `with()`. Never allow N+1 queries in a controller, an Action, or a Resource.

**Rules:**
- Use `with()` for relationships that will always be accessed.
- Use `withCount()` for counts instead of loading the full relationship.
- Use `loadMissing()` in a Resource when a relationship might be loaded by the caller.
- Use `Model::preventLazyLoading()` in `AppServiceProvider` for non-production environments. This makes N+1 queries throw exceptions during development.

**Forbidden:** Accessing `$order->items` in a loop without eager loading. Accessing `$product->category` in a Resource without eager loading. Passing a collection to Inertia without eager-loading its relationships.

---

## RULE 11 — DATABASE TRANSACTIONS WRAP EVERY MULTI-WRITE OPERATION

Every operation that performs more than one write to the database is wrapped in `DB::transaction()`. This includes creating an order with items, updating stock and logging a movement, and issuing a refund and updating an order.

**Rules:**
- Use `DB::transaction(function () { ... })` for readability.
- Use `lockForUpdate()` on rows that must not be modified concurrently, especially inventory rows.
- Never perform HTTP calls or queue dispatches inside a transaction. Dispatch after the transaction commits.
- Never nest transactions. If you need nested behavior, use savepoints.

**Forbidden:** Creating an order and its items without a transaction. Decrementing stock and logging a movement in separate requests.

---

## RULE 12 — EVENTS DECOUPLE SIDE EFFECTS

Every action that triggers a side effect (email, notification, webhook, external API call, cache invalidation) fires a domain event. The side effect is handled by a queued Listener.

**Naming:** `OrderPlaced`, `PaymentConfirmed`, `PaymentFailed`, `OrderShipped`, `OrderCancelled`, `OrderRefunded`.

**Rules:**
- Every event is a plain PHP class inside `app/Events/`.
- Every event carries the model it concerns as a public property.
- Every event is fired after the transaction commits.
- Every listener is queued by implementing `ShouldQueue`.
- Every listener is idempotent. Running it twice produces the same result.

**Forbidden:** Sending an email synchronously from a controller. Firing an event inside a transaction. A listener that fires another event without documenting the chain.

---

## RULE 13 — QUEUE EVERYTHING THAT IS NOT CRITICAL TO THE RESPONSE

Any operation that takes more than 200 milliseconds, calls an external service, or sends an email is queued. The Inertia response returns immediately.

**Rules:**
- Use Redis as the queue driver in all environments except local testing.
- Run at least two queue workers in production with a supervisor.
- Use separate queues for `emails`, `webhooks`, `payments`, and `default`.
- Use `Queue::fake()` in tests that verify a job was dispatched without executing it.
- Monitor failed jobs and set up alerts.

**Forbidden:** Sending an email synchronously. Calling an external API synchronously from a controller. Long-running operations in a request handler.

---

## RULE 14 — WEBHOOKS ARE IDEMPOTENT AND VERIFIED

Every webhook handler verifies the provider's signature. Every webhook handler is idempotent. Every webhook handler returns 200 even on failure to prevent provider retry storms.

**Rules:**
- Verify the signature using the provider's secret before processing the payload.
- Extract the transaction reference from the payload using a provider-specific extractor.
- Store the raw payload in a `webhook_logs` table with the provider, reference, and status.
- Check if the reference has already been processed. If so, return 200 and do nothing.
- Dispatch processing to a queued job.
- Return 200 immediately.

**Forbidden:** Processing a webhook inline. Marking an order as paid based only on the client-side redirect. Trusting a webhook payload without signature verification.

**Why it matters in an Inertia app:** Webhook endpoints are the only routes that do not return Inertia responses. They are plain HTTP endpoints that return JSON. Keep them in a separate `routes/webhooks.php` file so they never mix with page routes.

---

## RULE 15 — FAILED JOBS ARE RETRIED AND MONITORED

Every queued job defines its retry behavior explicitly. Every failed job is logged, monitored, and alerted on.

**Rules:**
- Every job defines `$tries`, `$backoff`, and `$timeout` properties.
- Every job implements `failed(Throwable $exception)` to log the failure with context.
- Every job is idempotent. A retry does not double-charge, double-send, or double-log.
- Every failed job is surfaced in a dashboard. Use Horizon if Redis is the driver.

**Forbidden:** A job without a retry policy. A job that fails silently. A job that logs to `storage/logs` only.

---

## RULE 16 — CACHE IS NAMESPACED AND INVALIDATED

Every cache entry uses a namespaced key. Every cache entry is invalidated when the underlying data changes.

**Rules:**
- Use `Cache::remember()` with a key such as `products:featured`, `categories:tree`, `collections:active`.
- Invalidate cache in an event listener, not in the controller.
- Use tags when the driver supports them (Redis). Use explicit keys when tags are unavailable.
- Cache for the shortest time that makes sense. A product listing caches for five minutes. A category tree caches for one hour.

**Forbidden:** `Cache::remember('products', ...)` without a namespace. Cache entries that never expire. Cache entries that outlive their data.

---

## RULE 17 — CONFIGURATION IS ENVIRONMENT-DRIVEN

Every configurable value lives in a `config/*.php` file. Every config file reads from environment variables. No magic numbers, no hardcoded URLs, no hardcoded credentials.

**Rules:**
- Use `config('aura.currency')` instead of `'KES'` inline.
- Use `config('aura.free_shipping_threshold')` instead of `99` inline.
- Every env variable has a default value in the config file so the app works without it in development.
- Never call `env()` outside `config/` files. Cache the config with `php artisan config:cache` in production.

**Forbidden:** `env('STRIPE_KEY')` in a controller. Hardcoded currency codes, tax rates, thresholds, or URLs.

---

## RULE 18 — STORE SETTINGS IN THE DATABASE, NOT IN CONFIG

Store-wide settings that admins can change at runtime — currency, tax rate, free-shipping threshold, low-stock threshold, admin notification email — live in a database-backed settings table, not in `config/`. Use a package such as `spatie/laravel-settings` or a custom `settings` table.

**Rules:**
- Every setting has a typed accessor.
- Every setting is cached after the first read.
- Every setting change invalidates the cache.
- Every setting is editable from the admin panel.
- Every setting change is logged with the admin user ID.

**Forbidden:** `config('aura.tax_rate')` for a value the admin can change. Hardcoding a store email in a listener.

---

## RULE 19 — TESTS COVER EVERY ACTION, POLICY, AND FORM REQUEST

Every Action has a feature test. Every Policy has a policy test. Every Form Request has a validation test. Every webhook handler has a test with a real sample payload.

**Rules:**
- Use Pest as the test framework.
- Organize tests by domain: `tests/Feature/Orders/`, `tests/Feature/Payments/`, `tests/Feature/Cart/`.
- Fake all external dependencies. `Http::fake()`, `Mail::fake()`, `Queue::fake()`, `Notification::fake()`, `Payment::fake()`.
- Test both the happy path and the failure paths.
- Test the database state after the operation, not just the response.
- Test that events were dispatched using `Event::fake()`.
- Use `Inertia\Testing\AssertableInertia` to assert that the correct page was rendered with the correct props. Never assert on the raw HTML.

**Forbidden:** Tests that hit the network. Tests that depend on the order of other tests. Tests without assertions. Tests longer than 100 lines. Asserting on rendered HTML when Inertia assertions are available.

---

## RULE 20 — FACTORIES ARE THE ONLY WAY TO SEED TEST DATA

Every model used in tests has a factory. Never create models manually with `Model::create()` in a test. Never use seeders in tests.

**Rules:**
- Every factory defines a valid default state.
- Every factory defines named states such as `pending()`, `paid()`, `cancelled()`, `outOfStock()`.
- Every factory defines relationships using `for()` and `has()`.
- Every factory is tested implicitly by the tests that use it.

**Forbidden:** `User::create(['name' => 'Test', ...])` in a test. Seeders in test environments. Hardcoded IDs.

---

## RULE 21 — NO BUSINESS LOGIC IN MIDDLEWARE

Middleware handles cross-cutting concerns: authentication, authorization gates, rate limiting, CORS, request logging. It does not contain business logic.

**Allowed in middleware:** Calling `auth()->check()`. Calling `Gate::authorize()`. Applying a rate limiter. Setting response headers. Logging the request. Sharing data with Inertia via `Inertia::share()`.

**Forbidden:** Querying the database for business data. Modifying a model. Sending a notification. Firing an event.

**Rule:** Use `HandleInertiaRequests` middleware to share global props such as the authenticated user, flash messages, and cart count. Never share more than necessary — every shared prop is serialized on every request.

---

## RULE 22 — NO BUSINESS LOGIC IN OBSERVERS

Observers respond to model lifecycle events such as `created`, `updated`, `deleted`. They log, they invalidate cache, they dispatch events. They do not contain business logic.

**Allowed in observers:** Logging a status change. Invalidating a cache entry. Dispatching a domain event.

**Forbidden:** Sending an email directly. Calling an external API. Performing multi-model writes. Any operation that could fail silently.

**Rule:** If a model event triggers work that could fail or that must be retried, dispatch a queued job from the observer.

---

## RULE 23 — NO QUERIES IN BLADE OR INERTIA PROPS

Every query happens in a controller, an Action, or a dedicated query class. Never in a Blade template. Never in a computed prop passed to Inertia.

**Rule:** If a controller needs to pass a computed value such as `ordersCount` or `totalSpend`, that value is computed in the controller using a query, or provided by an accessor that uses `withCount` or `withSum`.

**Forbidden:** `Order::where('user_id', auth()->id())->count()` inside an Inertia prop closure. `$user->orders()->count()` in a Blade template. `DB::table(...)->get()` in a Vue component.

---

## RULE 24 — INERTIA RESPONSES USE TYPED PROPS

Every Inertia response passes typed props. Never pass a raw array without structure. Never pass a `Collection` without wrapping it in a Resource.

**Rules:**
- Every prop is either a scalar, a Resource, or a Resource Collection.
- Every prop name matches the TypeScript interface declared in `resources/js/types/`.
- Every prop has a default value if it might be missing.
- Every prop that represents a list is a paginated resource when the list could exceed 100 items.

**Forbidden:** `return Inertia::render('Orders', ['data' => $orders]);` with an untyped array. Passing raw `Collection` instances. Passing props without a corresponding TypeScript interface.

---

## RULE 25 — SHARED PROPS ARE MINIMAL AND CACHED

`HandleInertiaRequests::share()` returns props that are available on every page. Every shared prop is evaluated on every request. Every shared prop must be cheap to compute.

**Rules:**
- Share only what every page needs: the authenticated user (via `UserResource`), flash messages, cart count.
- Cache expensive shared props such as cart count using `Cache::remember()` with a short TTL.
- Never share the full cart object. Share only the item count.
- Never share admin data with non-admin users.

**Forbidden:** Sharing the full product catalog. Sharing the full order history. Sharing anything that requires a database query on every request without caching.

---

## RULE 26 — LOGGING IS STRUCTURED AND SANITIZED

Every log entry uses a structured channel. Every log entry includes context. Every log entry excludes sensitive data.

**Rules:**
- Use `Log::channel('payments')->info('Payment initiated', ['order_id' => $order->id, 'amount' => $order->total])`.
- Never log passwords, API tokens, card numbers, or full request bodies.
- Use separate channels for `payments`, `webhooks`, `orders`, and `default`.
- Every log entry has a message that explains what happened, not what the code is doing.

**Forbidden:** `Log::info('here')`. `Log::info($request->all())`. Logging the raw webhook payload without stripping sensitive fields.

---

## RULE 27 — SECURITY IS VERIFIED AT EVERY LAYER

Every input is validated. Every output is escaped. Every route is authorized. Every secret is in the environment.

**Rules:**
- CSRF protection is enabled on all Inertia routes. Inertia sends the CSRF token automatically via its axios instance.
- HTTPS is enforced in production with a middleware.
- Cookies are marked `Secure` and `HttpOnly`.
- Passwords are hashed with bcrypt or argon2.
- Login attempts are rate-limited.
- Payment initiation is rate-limited.
- Search is rate-limited.
- All secrets are in `.env` and never committed.
- Run `composer audit` in CI on every pull request.

**Forbidden:** `DB::raw()` with user input. `->whereRaw()` with user input. Storing card numbers. Logging API secrets. Disabling CSRF globally.

**Why it matters in an Inertia app:** Inertia uses axios under the hood and automatically attaches the `X-XSRF-TOKEN` header to every non-GET request. Never disable this. Never manually fetch a CSRF token in Vue.

---

## RULE 28 — PERFORMANCE IS MEASURED, NOT ASSUMED

Every query is benchmarked. Every Inertia response is measured. Every improvement is validated with numbers.

**Rules:**
- Use Laravel Telescope in local development to identify slow queries.
- Use `DB::listen()` in a debug service provider to log queries over 100 milliseconds.
- Use response caching for anonymous storefront pages via a middleware.
- Use Redis for session, cache, and queue drivers.
- Use Laravel Octane in production for throughput gains.
- Benchmark before and after every optimization.

**Forbidden:** Adding a cache without measuring the original. Adding an index without a query that uses it. Assuming a query is fast because it "looks fast."

---

## RULE 29 — FILE ORGANIZATION IS DOMAIN-DRIVEN

Organize the application by domain, not by file type. Every feature has its own folder containing its Actions, Events, Listeners, Policies, and Tests.
