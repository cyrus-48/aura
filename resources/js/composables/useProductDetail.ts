import { computed, ref } from 'vue';
import { router } from '@inertiajs/vue3';
import type { ProductDetail, ProductVariant } from '@/types/product';

/**
 * Composable managing product detail gallery, variant choices, and add to bag actions.
 * Adheres to Rule 4.
 */
export function useProductDetail(product: ProductDetail) {
    const selectedVariantId = ref<number | null>(
        product?.variants && product.variants.length > 0
            ? (product.variants.find((v) => v.inStock)?.id ?? product.variants[0].id)
            : null,
    );
    const quantity = ref<number>(1);
    const activeImage = ref<string>(
        product?.media?.primaryImage ||
            (product?.media?.gallery && product.media.gallery.length > 0 ? product.media.gallery[0] : ''),
    );
    const isAdding = ref<boolean>(false);
    const addSuccess = ref<boolean>(false);

    const selectedVariant = computed<ProductVariant | null>(() => {
        if (!selectedVariantId.value || !product?.variants) {
            return null;
        }
        return (
            product.variants.find((v) => v.id === selectedVariantId.value) ||
            null
        );
    });

    const currentPrice = computed<number>(() => {
        if (selectedVariant.value && selectedVariant.value.price) {
            return selectedVariant.value.price;
        }
        return product.basePrice;
    });

    const isAvailable = computed<boolean>(() => {
        if (selectedVariant.value) {
            return selectedVariant.value.inStock;
        }
        return product.hasStock;
    });

    const maxStock = computed<number>(() => {
        if (selectedVariant.value) {
            return selectedVariant.value.stockCount;
        }
        return 99;
    });

    function selectVariant(variant: ProductVariant): void {
        selectedVariantId.value = variant.id;
        if (quantity.value > variant.stockCount) {
            quantity.value = Math.max(1, variant.stockCount);
        }
    }

    function setActiveImage(imageUrl: string): void {
        activeImage.value = imageUrl;
    }

    function incrementQuantity(): void {
        if (quantity.value < maxStock.value) {
            quantity.value++;
        }
    }

    function decrementQuantity(): void {
        if (quantity.value > 1) {
            quantity.value--;
        }
    }

    function addToCart(): void {
        if (!isAvailable.value || isAdding.value) {
            return;
        }

        isAdding.value = true;
        addSuccess.value = false;

        router.post(
            '/cart',
            {
                product_id: product.id,
                product_variant_id: selectedVariantId.value,
                variant_id: selectedVariantId.value,
                quantity: quantity.value,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    addSuccess.value = true;
                    setTimeout(() => {
                        addSuccess.value = false;
                    }, 3000);
                },
                onFinish: () => {
                    isAdding.value = false;
                },
            },
        );
    }

    function buyNow(): void {
        if (!isAvailable.value || isAdding.value) {
            return;
        }

        isAdding.value = true;

        router.post(
            '/cart',
            {
                product_id: product.id,
                product_variant_id: selectedVariantId.value,
                variant_id: selectedVariantId.value,
                quantity: quantity.value,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit('/checkout');
                },
                onFinish: () => {
                    isAdding.value = false;
                },
            },
        );
    }

    return {
        selectedVariantId,
        selectedVariant,
        quantity,
        activeImage,
        isAdding,
        addSuccess,
        currentPrice,
        isAvailable,
        maxStock,
        selectVariant,
        setActiveImage,
        incrementQuantity,
        decrementQuantity,
        addToCart,
        buyNow,
    };
}
