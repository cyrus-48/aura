<script setup lang="ts">
defineProps<{
    title: string;
    value: string | number;
    icon: string;
    iconBgClass?: string;
    iconColorClass?: string;
    changeText?: string;
    changeType?: 'positive' | 'negative' | 'neutral' | 'warning' | 'alert';
    badgeText?: string;
    sparkline: number[];
    sparklineBarClass?: string;
}>();
</script>

<template>
    <div
        class="rounded-xl border border-aura-sage bg-white p-5 shadow-card transition-shadow hover:shadow-soft"
    >
        <div class="mb-4 flex items-start justify-between">
            <div
                :class="[
                    'flex h-10 w-10 items-center justify-center rounded-lg',
                    iconBgClass || 'bg-aura-sage',
                    iconColorClass || 'text-aura-slate',
                ]"
            >
                <i :class="[icon, 'text-sm']"></i>
            </div>

            <!-- Change Badge or Alert Badge -->
            <span
                v-if="changeText"
                :class="[
                    'flex items-center rounded-full px-2 py-1 text-[9px] font-semibold',
                    changeType === 'positive'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700',
                ]"
            >
                <i
                    v-if="changeType === 'positive'"
                    class="fa-solid fa-arrow-up mr-1 text-[7px]"
                ></i>
                <i
                    v-else-if="changeType === 'negative'"
                    class="fa-solid fa-arrow-down mr-1 text-[7px]"
                ></i>
                {{ changeText }}
            </span>
            <span
                v-else-if="badgeText"
                :class="[
                    'flex items-center rounded-full px-2 py-1 text-[9px] font-semibold',
                    changeType === 'alert'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-amber-50 text-amber-700',
                ]"
            >
                {{ badgeText }}
            </span>
        </div>

        <p
            class="text-[10px] font-semibold tracking-widest text-aura-moss uppercase"
        >
            {{ title }}
        </p>
        <h3 class="mt-1 font-serif text-2xl text-aura-slate">
            {{ value }}
        </h3>

        <!-- Sparkline Bars -->
        <div class="mt-4 flex h-8 items-end space-x-1">
            <div
                v-for="(height, idx) in sparkline"
                :key="idx"
                :class="[
                    'w-full rounded-sm transition-opacity hover:opacity-80',
                    sparklineBarClass ||
                        (idx >= 5 ? 'bg-aura-accent' : 'bg-aura-sage'),
                ]"
                :style="{ height: `${height}%` }"
            ></div>
        </div>
    </div>
</template>
