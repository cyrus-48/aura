<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Customer;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\CustomerNote;
use App\Models\Order;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class CustomerDetailController extends Controller
{
    /**
     * Display detailed profile, order history, addresses, and internal notes for a customer.
     */
    public function __invoke(User $user): Response
    {
        $user->loadMissing([
            'orders' => fn ($q) => $q->with('items')->latest('id'),
            'addresses',
            'customerNotes.author',
        ]);

        $orders = $user->orders->map(fn (Order $order) => [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'items_count' => $order->items->sum('quantity'),
            'total' => (float) $order->total,
            'formatted_total' => '$'.number_format((float) $order->total, 2),
            'status' => $order->status->value,
            'status_label' => $order->status->label(),
            'status_color' => $order->status->badgeClasses(),
            'created_at' => $order->created_at?->format('M d, Y') ?? '',
        ]);

        $addresses = $user->addresses->map(fn (Address $address) => [
            'id' => $address->id,
            'type' => $address->type->value ?? 'shipping',
            'recipient_name' => $address->fullName(),
            'address_line_1' => $address->address_line_1,
            'city' => $address->city,
            'postal_code' => $address->postal_code,
            'country' => $address->country,
            'is_default' => (bool) $address->is_default,
        ]);

        $notes = $user->customerNotes->sortByDesc('id')->values()->map(fn (CustomerNote $n) => [
            'id' => $n->id,
            'author_name' => $n->author?->name ?? 'Staff Operator',
            'note' => $n->note,
            'created_at' => $n->created_at?->format('M d, Y H:i') ?? '',
        ]);

        $totalSpend = (float) $user->orders->sum('total');

        return Inertia::render('admin/customers/Detail', [
            'customer' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role->value,
                'is_verified' => $user->email_verified_at !== null,
                'created_at' => $user->created_at?->format('M d, Y') ?? '',
                'total_spend' => '$'.number_format($totalSpend, 2),
                'order_count' => $user->orders->count(),
            ],
            'orders' => $orders,
            'addresses' => $addresses,
            'notes' => $notes,
        ]);
    }
}
