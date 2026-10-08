<script setup lang="ts">
interface Props {
    modelValue?: string | number | null;
    label?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    hint?: string;
}

withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    placeholder: '',
    error: '',
    required: false,
    disabled: false,
    hint: '',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}
</script>

<template>
    <div class="w-full">
        <label
            v-if="label"
            :for="id"
            class="form-label flex items-center justify-between"
        >
            <span
                >{{ label }}
                <span v-if="required" class="text-red-500">*</span></span
            >
            <span
                v-if="hint"
                class="text-[9px] font-normal tracking-normal text-aura-moss lowercase"
                >{{ hint }}</span
            >
        </label>
        <div class="relative">
            <input
                :id="id"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :disabled="disabled"
                :required="required"
                :class="[
                    'form-input',
                    error &&
                        '!border-red-500 focus:!border-red-600 focus:!ring-red-500',
                    disabled && 'cursor-not-allowed bg-black/5 opacity-60',
                ]"
                @input="onInput"
            />
            <div
                v-if="$slots.suffix"
                class="absolute top-1/2 right-3 flex -translate-y-1/2 items-center text-aura-moss"
            >
                <slot name="suffix" />
            </div>
        </div>
        <p v-if="error" class="mt-1 text-[11px] font-medium text-red-600">
            {{ error }}
        </p>
    </div>
</template>
