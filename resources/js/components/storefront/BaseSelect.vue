<script setup lang="ts">
interface Option {
    label: string;
    value: string | number;
}

interface Props {
    modelValue?: string | number | null;
    label?: string;
    id?: string;
    options: Option[] | string[];
    error?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

withDefaults(defineProps<Props>(), {
    modelValue: '',
    error: '',
    required: false,
    disabled: false,
    placeholder: 'Select an option',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

function onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value);
}
</script>

<template>
    <div class="w-full">
        <label v-if="label" :for="id" class="form-label">
            {{ label }} <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="relative">
            <select
                :id="id"
                :value="modelValue"
                :disabled="disabled"
                :required="required"
                :class="[
                    'form-input cursor-pointer appearance-none bg-transparent pr-10',
                    error && '!border-red-500 focus:!border-red-600',
                    disabled && 'cursor-not-allowed bg-black/5 opacity-60',
                ]"
                @change="onChange"
            >
                <option
                    v-if="placeholder"
                    value=""
                    disabled
                    class="bg-white text-aura-moss"
                >
                    {{ placeholder }}
                </option>
                <option
                    v-for="opt in options"
                    :key="typeof opt === 'string' ? opt : opt.value"
                    :value="typeof opt === 'string' ? opt : opt.value"
                    class="bg-white py-1 text-aura-slate"
                >
                    {{ typeof opt === 'string' ? opt : opt.label }}
                </option>
            </select>
            <div
                class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-aura-moss"
            >
                <i class="fa-solid fa-chevron-down"></i>
            </div>
        </div>
        <p v-if="error" class="mt-1 text-[11px] font-medium text-red-600">
            {{ error }}
        </p>
    </div>
</template>
