<script setup lang="ts">
import type { AccountTabId } from '@/composables/useAccount';
import type { UserProfile } from '@/types/account';

defineProps<{
    activeTab: AccountTabId;
    user: UserProfile;
}>();

const emit = defineEmits<{
    (e: 'select', tab: AccountTabId): void;
}>();

const tabs: { id: AccountTabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Dashboard', icon: 'fa-solid fa-gauge-high' },
    { id: 'orders', label: 'Orders', icon: 'fa-solid fa-box-open' },
    { id: 'addresses', label: 'Addresses', icon: 'fa-solid fa-location-dot' },
    { id: 'profile', label: 'Settings', icon: 'fa-solid fa-gear' },
];
</script>

<template>
    <aside class="w-full shrink-0 lg:w-64">
        <div class="sticky top-24">
            <div
                class="mb-6 rounded-2xl border border-aura-sage/50 bg-white p-6 shadow-soft"
            >
                <!-- User Profile Mini -->
                <div
                    class="mb-6 flex items-center space-x-4 border-b border-aura-sage pb-6"
                >
                    <div
                        class="flex h-12 w-12 items-center justify-center rounded-full bg-aura-sage font-serif text-xl text-aura-slate"
                    >
                        {{
                            user.initials || user.name.slice(0, 2).toUpperCase()
                        }}
                    </div>
                    <div>
                        <h3 class="text-sm font-medium text-aura-slate">
                            {{ user.name }}
                        </h3>
                        <p class="text-[10px] text-aura-moss">
                            {{ user.email }}
                        </p>
                    </div>
                </div>

                <!-- Nav Links -->
                <ul class="space-y-3 text-sm">
                    <li v-for="tab in tabs" :key="tab.id">
                        <button
                            type="button"
                            class="flex w-full items-center rounded px-3 py-2 text-left transition"
                            :class="
                                activeTab === tab.id
                                    ? 'bg-aura-sage/50 font-medium text-aura-slate'
                                    : 'text-aura-moss hover:bg-aura-sage/30 hover:text-aura-slate'
                            "
                            @click="emit('select', tab.id)"
                        >
                            <i :class="[tab.icon, 'mr-3 w-4 text-xs']"></i>
                            {{ tab.label }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>
