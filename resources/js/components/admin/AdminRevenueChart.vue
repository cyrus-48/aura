<script setup lang="ts">
import { computed, ref } from 'vue';
import type { AdminChartPoint } from '@/types/admin';

const props = defineProps<{
    data: AdminChartPoint[];
}>();

const hoveredIndex = ref<number | null>(null);

const maxRevenue = computed(() => {
    const max = Math.max(...props.data.map((d) => d.revenue), 100);
    return Math.ceil(max / 100) * 100;
});

const yAxisTicks = computed(() => {
    const max = maxRevenue.value;
    return [
        `$${max.toLocaleString()}`,
        `$${Math.round((max * 0.8)).toLocaleString()}`,
        `$${Math.round((max * 0.6)).toLocaleString()}`,
        `$${Math.round((max * 0.4)).toLocaleString()}`,
        `$${Math.round((max * 0.2)).toLocaleString()}`,
        '$0',
    ];
});

const hoveredPoint = computed(() => {
    if (hoveredIndex.value === null) return null;
    return props.data[hoveredIndex.value] ?? null;
});
</script>

<template>
    <div class="rounded-xl border border-aura-sage bg-white shadow-card">
        <div class="flex flex-col justify-between gap-3 border-b border-aura-sage px-5 py-4 sm:flex-row sm:items-center">
            <div>
                <h2 class="font-serif text-base text-aura-slate">Revenue Overview</h2>
                <p class="text-[10px] text-aura-moss">Daily revenue for the last 30 days</p>
            </div>
            <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-1.5">
                    <span class="h-2 w-2 rounded-full bg-aura-slate" />
                    <span class="text-[10px] text-aura-moss">Revenue ($)</span>
                </div>
                <div v-if="hoveredPoint" class="rounded bg-aura-bg px-2 py-1 text-[10px] font-semibold text-aura-slate">
                    {{ hoveredPoint.date }}: {{ hoveredPoint.formatted_revenue }}
                </div>
            </div>
        </div>

        <div class="p-5">
            <div class="relative h-64 w-full">
                <!-- Y-axis -->
                <div class="absolute top-0 left-0 flex h-full flex-col justify-between text-[9px] text-aura-moss">
                    <span v-for="tick in yAxisTicks" :key="tick">{{ tick }}</span>
                </div>

                <!-- Grid lines -->
                <div class="absolute top-0 right-0 left-12 flex h-full flex-col justify-between">
                    <div class="border-t border-dashed border-aura-sage/60" />
                    <div class="border-t border-dashed border-aura-sage/60" />
                    <div class="border-t border-dashed border-aura-sage/60" />
                    <div class="border-t border-dashed border-aura-sage/60" />
                    <div class="border-t border-dashed border-aura-sage/60" />
                    <div class="border-t border-aura-sage" />
                </div>

                <!-- Bars -->
                <div class="absolute right-0 bottom-0 left-12 flex h-full items-end justify-between space-x-1 pl-2">
                    <div
                        v-for="(point, idx) in props.data"
                        :key="point.date + idx"
                        class="group relative h-full flex-1 flex items-end cursor-pointer"
                        @mouseenter="hoveredIndex = idx"
                        @mouseleave="hoveredIndex = null"
                    >
                        <div
                            :class="[
                                'w-full rounded-t-xs transition-all duration-200',
                                hoveredIndex === idx
                                    ? 'bg-aura-slate opacity-100'
                                    : 'bg-aura-slate/75 hover:opacity-90',
                            ]"
                            :style="{ height: `${Math.max(point.height_percent, 4)}%` }"
                        />
                    </div>
                </div>
            </div>

            <!-- X-axis labels -->
            <div class="mt-2 flex justify-between pl-12 text-[9px] text-aura-moss">
                <span>{{ props.data[0]?.date ?? '' }}</span>
                <span>{{ props.data[Math.floor(props.data.length * 0.25)]?.date ?? '' }}</span>
                <span>{{ props.data[Math.floor(props.data.length * 0.5)]?.date ?? '' }}</span>
                <span>{{ props.data[Math.floor(props.data.length * 0.75)]?.date ?? '' }}</span>
                <span>{{ props.data[props.data.length - 1]?.date ?? '' }}</span>
            </div>
        </div>
    </div>
</template>
