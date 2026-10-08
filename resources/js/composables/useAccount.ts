import { ref } from 'vue';

export type AccountTabId = 'overview' | 'orders' | 'addresses' | 'profile';

/**
 * Composable managing customer account active view and tab navigation.
 * Adheres to Rule 4.
 */
export function useAccount(initialTab: AccountTabId = 'overview') {
    const activeTab = ref<AccountTabId>(initialTab);

    function setActiveTab(tab: AccountTabId): void {
        activeTab.value = tab;
    }

    return {
        activeTab,
        setActiveTab,
    };
}
