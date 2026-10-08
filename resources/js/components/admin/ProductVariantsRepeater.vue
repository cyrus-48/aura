<script setup lang="ts">
export interface VariantItem {
    id?: number;
    sku: string;
    color: string;
    color_hex?: string;
    size: string;
    stock_count: number;
    price_adjustment: number;
}

const props = defineProps<{
    variants: VariantItem[];
    productSlug?: string;
}>();

const emit = defineEmits<{
    (e: 'update:variants', variants: VariantItem[]): void;
}>();

const addVariant = () => {
    const nextIndex = props.variants.length + 1;
    const baseSku = props.productSlug ? props.productSlug.toUpperCase().slice(0, 8) : 'SKU';
    const newVariant: VariantItem = {
        sku: `${baseSku}-${nextIndex}`,
        color: 'Oatmeal',
        color_hex: '#E3DAC9',
        size: 'M',
        stock_count: 10,
        price_adjustment: 0.00,
    };
    emit('update:variants', [...props.variants, newVariant]);
};

const removeVariant = (idx: number) => {
    emit('update:variants', props.variants.filter((_, i) => i !== idx));
};
</script>

<template>
    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card">
        <div class="mb-4 flex items-center justify-between">
            <div>
                <h3 class="font-serif text-sm font-semibold text-aura-slate">Product Variants</h3>
                <p class="text-[11px] text-aura-moss">SKUs, sizes, colors, and stock levels</p>
            </div>
            <button
                type="button"
                class="rounded-lg border border-aura-sage bg-white px-3 py-1.5 text-[10px] font-medium tracking-wider text-aura-slate uppercase transition hover:bg-aura-sage/40 cursor-pointer"
                @click="addVariant"
            >
                <i class="fa-solid fa-plus mr-1 text-[8px]" /> Add Variant
            </button>
        </div>

        <div v-if="variants.length > 0" class="space-y-3">
            <div
                v-for="(v, idx) in variants"
                :key="idx"
                class="relative rounded-lg border border-aura-sage/60 bg-aura-bg/30 p-3.5"
            >
                <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                    <div>
                        <label class="block text-[9px] font-semibold text-aura-moss uppercase">SKU</label>
                        <input
                            v-model="v.sku"
                            type="text"
                            required
                            class="mt-1 w-full rounded border border-aura-sage bg-white px-2 py-1 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                        />
                    </div>
                    <div>
                        <label class="block text-[9px] font-semibold text-aura-moss uppercase">Color</label>
                        <input
                            v-model="v.color"
                            type="text"
                            required
                            class="mt-1 w-full rounded border border-aura-sage bg-white px-2 py-1 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                        />
                    </div>
                    <div>
                        <label class="block text-[9px] font-semibold text-aura-moss uppercase">Size</label>
                        <input
                            v-model="v.size"
                            type="text"
                            required
                            class="mt-1 w-full rounded border border-aura-sage bg-white px-2 py-1 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                        />
                    </div>
                    <div>
                        <label class="block text-[9px] font-semibold text-aura-moss uppercase">Stock</label>
                        <input
                            v-model.number="v.stock_count"
                            type="number"
                            min="0"
                            required
                            class="mt-1 w-full rounded border border-aura-sage bg-white px-2 py-1 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                        />
                    </div>
                    <div class="flex items-end gap-1.5">
                        <div class="flex-1">
                            <label class="block text-[9px] font-semibold text-aura-moss uppercase">Adjust ($)</label>
                            <input
                                v-model.number="v.price_adjustment"
                                type="number"
                                step="0.01"
                                class="mt-1 w-full rounded border border-aura-sage bg-white px-2 py-1 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                            />
                        </div>
                        <button
                            v-if="variants.length > 1"
                            type="button"
                            class="mb-0.5 flex h-7 w-7 items-center justify-center rounded text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                            title="Remove variant"
                            @click="removeVariant(idx)"
                        >
                            <i class="fa-solid fa-trash-can text-xs" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="rounded-lg border border-dashed border-aura-sage p-4 text-center text-xs text-aura-moss">
            No variants created. Click "Add Variant" to configure sizes and colors.
        </div>
    </div>
</template>
