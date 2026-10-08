<script setup lang="ts">
import { computed } from 'vue';
import EmptyState from '@/components/admin/EmptyState.vue';

export interface DataTableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: string;
    class?: string;
}

const props = withDefaults(
    defineProps<{
        columns: DataTableColumn[];
        rows?: Record<string, any>[];
        data?: Record<string, any>[];
        rowKey?: string;
        itemKey?: string;
        loading?: boolean;
        error?: string | null;
        selectable?: boolean;
        selectedKeys?: (string | number)[];
        sortBy?: string;
        sortDirection?: 'asc' | 'desc';
        emptyTitle?: string;
        emptyDescription?: string;
        emptyActionLabel?: string;
        emptyActionHref?: string;
    }>(),
    {
        rows: () => [],
        data: () => [],
        rowKey: 'id',
        itemKey: 'id',
        loading: false,
        error: null,
        selectable: false,
        selectedKeys: () => [],
        sortBy: '',
        sortDirection: 'asc',
        emptyTitle: 'No records found',
        emptyDescription: 'Try adjusting your search filters or create a new entry.',
        emptyActionLabel: '',
        emptyActionHref: '',
    },
);

const emit = defineEmits<{
    (e: 'sort', key: string): void;
    (e: 'row-click', row: Record<string, any>): void;
    (e: 'update:selectedKeys', keys: (string | number)[]): void;
    (e: 'retry'): void;
}>();

const effectiveRows = computed(() => {
    if (props.rows && props.rows.length > 0) return props.rows;
    if (props.data && props.data.length > 0) return props.data;
    return props.rows ?? props.data ?? [];
});

const effectiveKey = computed(() => props.itemKey !== 'id' ? props.itemKey : props.rowKey);

const allSelected = computed(() => {
    if (effectiveRows.value.length === 0) return false;
    return effectiveRows.value.every((r) => props.selectedKeys.includes(r[effectiveKey.value]));
});

const isSelected = (row: Record<string, any>) => {
    return props.selectedKeys.includes(row[effectiveKey.value]);
};

const toggleSelectAll = () => {
    if (allSelected.value) {
        emit('update:selectedKeys', []);
    } else {
        emit('update:selectedKeys', effectiveRows.value.map((r) => r[effectiveKey.value]));
    }
};

const toggleSelectRow = (row: Record<string, any>, event: Event) => {
    event.stopPropagation();
    const key = row[effectiveKey.value];
    if (props.selectedKeys.includes(key)) {
        emit('update:selectedKeys', props.selectedKeys.filter((k) => k !== key));
    } else {
        emit('update:selectedKeys', [...props.selectedKeys, key]);
    }
};
</script>

<template>
    <div class="overflow-x-auto">
        <table class="w-full text-left">
            <thead>
                <tr class="border-b border-aura-sage bg-aura-bg/30">
                    <!-- Checkbox Column -->
                    <th v-if="selectable" class="w-10 px-4 py-3 text-center">
                        <input
                            type="checkbox"
                            :checked="allSelected"
                            class="h-4 w-4 rounded border-aura-sage text-aura-slate focus:ring-aura-accent cursor-pointer"
                            @change="toggleSelectAll"
                        />
                    </th>

                    <th
                        v-for="col in columns"
                        :key="col.key"
                        :class="[
                            'px-5 py-3 text-[10px] font-semibold tracking-wider text-aura-moss uppercase',
                            col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                            col.sortable ? 'cursor-pointer select-none hover:text-aura-slate' : '',
                            col.class || '',
                        ]"
                        :style="col.width ? { width: col.width } : {}"
                        @click="col.sortable ? emit('sort', col.key) : null"
                    >
                        <div
                            :class="[
                                'inline-flex items-center space-x-1.5',
                                col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : '',
                            ]"
                        >
                            <span>{{ col.label }}</span>
                            <span v-if="col.sortable" class="text-[9px]">
                                <i
                                    v-if="sortBy === col.key"
                                    :class="[
                                        'fa-solid text-aura-slate',
                                        sortDirection === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down',
                                    ]"
                                />
                                <i v-else class="fa-solid fa-sort opacity-40" />
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>

            <!-- 1. Errored State -->
            <tbody v-if="error">
                <tr>
                    <td :colspan="columns.length + (selectable ? 1 : 0)" class="px-5 py-12 text-center">
                        <div class="flex flex-col items-center justify-center text-red-600">
                            <i class="fa-solid fa-triangle-exclamation mb-2 text-2xl" />
                            <p class="text-xs font-medium">{{ error }}</p>
                            <button
                                type="button"
                                class="mt-4 rounded-lg bg-aura-slate px-4 py-2 text-xs font-medium text-white transition hover:bg-aura-moss cursor-pointer"
                                @click="emit('retry')"
                            >
                                Try Again
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>

            <!-- 2. Loading State (Skeleton rows) -->
            <tbody v-else-if="loading">
                <tr v-for="i in 5" :key="i" class="animate-pulse border-b border-aura-sage/30">
                    <td v-if="selectable" class="px-4 py-4 text-center">
                        <div class="mx-auto h-4 w-4 rounded bg-aura-sage/50" />
                    </td>
                    <td v-for="col in columns" :key="col.key" class="px-5 py-4">
                        <div class="h-4 w-3/4 rounded bg-aura-sage/40" />
                    </td>
                </tr>
            </tbody>

            <!-- 3. Empty State -->
            <tbody v-else-if="effectiveRows.length === 0">
                <tr>
                    <td :colspan="columns.length + (selectable ? 1 : 0)">
                        <slot name="empty">
                            <EmptyState
                                :title="emptyTitle"
                                :description="emptyDescription"
                                :action-label="emptyActionLabel"
                                :action-href="emptyActionHref"
                            />
                        </slot>
                    </td>
                </tr>
            </tbody>

            <!-- 4. Populated State -->
            <tbody v-else>
                <tr
                    v-for="row in effectiveRows"
                    :key="row[effectiveKey]"
                    :class="[
                        'group h-14 border-b border-aura-sage/40 transition hover:bg-aura-bg/60 cursor-pointer last:border-b-0',
                        isSelected(row) ? 'bg-aura-sage/30' : '',
                    ]"
                    @click="emit('row-click', row)"
                >
                    <td v-if="selectable" class="px-4 py-3 text-center" @click.stop>
                        <input
                            type="checkbox"
                            :checked="isSelected(row)"
                            class="h-4 w-4 rounded border-aura-sage text-aura-slate focus:ring-aura-accent cursor-pointer"
                            @change="toggleSelectRow(row, $event)"
                        />
                    </td>

                    <td
                        v-for="col in columns"
                        :key="col.key"
                        :class="[
                            'px-5 py-3 text-xs',
                            col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                        ]"
                    >
                        <slot :name="col.key" :row="row" :value="row[col.key]">
                            <slot :name="'cell-' + col.key" :row="row" :value="row[col.key]">
                                {{ row[col.key] }}
                            </slot>
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
