import { computed, ref } from 'vue';
import type { FaqItem } from '@/types/faq';

/**
 * Composable managing FAQ filtering, search query, and accordion expansion.
 * Adheres to Rule 4.
 */
export function useFaq(initialFaqs: FaqItem[]) {
    const categories = [
        'All Categories',
        'Orders & Shipping',
        'Returns & Exchanges',
        'Products & Sizing',
        'Sustainability',
        'Account & Payment',
    ];

    const selectedCategory = ref('All Categories');
    const searchQuery = ref('');
    const openItems = ref<Record<number, boolean>>({ 1: true });

    const filteredFaqs = computed(() => {
        return initialFaqs.filter((item) => {
            const matchesCategory =
                selectedCategory.value === 'All Categories' ||
                item.category === selectedCategory.value;
            const matchesSearch =
                !searchQuery.value.trim() ||
                item.question
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase()) ||
                item.answer
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    });

    function toggleItem(id: number): void {
        openItems.value[id] = !openItems.value[id];
    }

    function setCategory(cat: string): void {
        selectedCategory.value = cat;
    }

    return {
        categories,
        selectedCategory,
        searchQuery,
        openItems,
        filteredFaqs,
        toggleItem,
        setCategory,
    };
}
