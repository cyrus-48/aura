<?php

declare(strict_types=1);

namespace App\Http\Resources\Order;

use App\Enums\ShippingMethod;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Order
 */
class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'orderNumber' => $this->order_number,
            'email' => $this->email,
            'phone' => $this->phone,
            'status' => $this->status->value,
            'statusLabel' => $this->status->label(),
            'statusColor' => $this->status->badgeColor(),
            'paymentStatus' => $this->payment_status->value,
            'paymentStatusLabel' => $this->payment_status->label(),
            'paymentStatusColor' => $this->payment_status->badgeColor(),
            'paymentMethod' => $this->payment_method->value,
            'paymentMethodLabel' => $this->payment_method->label(),
            'subtotal' => (float) $this->subtotal,
            'shippingCost' => (float) $this->shipping_cost,
            'taxAmount' => (float) $this->tax_amount,
            'discountAmount' => (float) $this->discount_amount,
            'total' => (float) $this->total,
            'shippingMethod' => $this->shipping_method instanceof ShippingMethod ? $this->shipping_method->label() : (string) ($this->shipping_method?->value ?? $this->shipping_method ?? 'Standard Delivery'),
            'shippingAddress' => $this->shippingAddress ? new AddressResource($this->shippingAddress) : null,
            'items' => OrderItemResource::collection($this->whenLoaded('items')),
            'createdAt' => $this->created_at?->format('M d, Y h:i A'),
        ];
    }
}
