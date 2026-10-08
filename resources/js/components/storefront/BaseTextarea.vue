<script setup lang="ts">
interface Props {
    modelValue?: string | null;
    label?: string;
    id?: string;
    rows?: number;
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
    modelValue: '',
    rows: 4,
    placeholder: '',
    error: '',
    required: false,
    disabled: false,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    emit('update:modelValue', target.value);
}
</script>

<template>
    <div class="w-full">
        <label v-if="label" :for="id" class="form-label">
            {{ label }} <span v-if="required" class="text-red-500">*</span>
        </label>
        <textarea
            :id="id"
            :rows="rows"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            :class="[
                'form-input min-h-[90px] resize-y',
                error && '!border-red-500 focus:!border-red-600',
                disabled && 'cursor-not-allowed bg-black/5 opacity-60',
            ]"
            @input="onInput"
        ></textarea>
        <p v-if="error" class="mt-1 text-[11px] font-medium text-red-600">
            {{ error }}
        </p>
    </div>
</template>
