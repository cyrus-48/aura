<script setup lang="ts">
import type { ShippingMethodOption } from '@/types/checkout';
import { formatPrice } from '@/utils';

defineProps<{
    options: ShippingMethodOption[];
    selectedId: string;
    notes: string;
}>();

const emit = defineEmits<{
    (e: 'update:selectedId', id: string): void;
    (e: 'update:notes', notes: string): void;
    (e: 'next'): void;
    (e: 'prev'): void;
}>();
</script>

<template>
    <div class="space-y-8">
        <div>
            <h2 class="mb-4 font-serif text-2xl text-aura-slate">
                Shipping Method
            </h2>

            <div class="space-y-3">
                <label
                    v-for="option in options"
                    :key="option.id"
                    class="flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-all"
                    :class="
                        selectedId === option.id
                            ? 'border-aura-slate bg-white shadow-soft'
                            : 'border-aura-sage bg-transparent hover:border-aura-accent'
                    "
                >
                    <div class="flex items-start gap-3">
                        <input
                            type="radio"
                            name="shipping-method"
                            :value="option.id"
                            :checked="selectedId === option.id"
                            class="mt-1 text-aura-slate focus:ring-aura-slate"
                            @change="emit('update:selectedId', option.id)"
                        />
                        <div>
                            <div class="text-sm font-medium text-aura-slate">
                                {{ option.name }}
                            </div>
                            <div class="text-xs text-aura-moss">
                                {{ option.estimatedDays }} ·
                                {{ option.description }}
                            </div>
                        </div>
                    </div>
                    <div class="text-sm font-medium text-aura-slate">
                        {{
                            option.rate === 0
                                ? 'Free'
                                : formatPrice(option.rate)
                        }}
                    </div>
                </label>
            </div>
        </div>

        <div class="border-t border-aura-sage pt-8">
            <label for="delivery-notes" class="form-label">
                Delivery Instructions (Optional)
            </label>
            <textarea
                id="delivery-notes"
                :value="notes"
                rows="3"
                placeholder="Gate codes, delivery instructions, or notes for courier..."
                class="form-input resize-none"
                @input="
                    emit(
                        'update:notes',
                        ($event.target as HTMLTextAreaElement).value,
                    )
                "
            />
        </div>

        <div class="flex items-center justify-between pt-4">
            <button
                type="button"
                class="flex items-center text-[11px] font-medium tracking-widest text-aura-moss uppercase transition hover:text-aura-slate"
                @click="emit('prev')"
            >
                <i class="fa-solid fa-arrow-left mr-2 text-[10px]"></i>
                Back to Contact
            </button>
            <button
                type="button"
                class="flex items-center justify-center rounded bg-aura-slate px-8 py-4 text-[11px] font-medium tracking-widest text-white uppercase transition duration-300 hover:bg-aura-moss"
                @click="emit('next')"
            >
                Continue to Payment
                <i class="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
            </button>
        </div>
    </div>
</template>
