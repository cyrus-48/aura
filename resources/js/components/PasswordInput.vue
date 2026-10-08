<script setup lang="ts">
import { Eye, EyeOff } from '@lucide/vue';
import { ref, useTemplateRef } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    class?: HTMLAttributes['class'];
    autofocus?: boolean;
}>();

const model = defineModel<string | number>();
const showPassword = ref(false);
const inputRef = useTemplateRef<HTMLInputElement>('inputRef');

defineExpose({
    $el: inputRef,
    focus: () => inputRef.value?.focus(),
});
</script>

<template>
    <div class="relative w-full">
        <input
            v-if="model !== undefined"
            v-focus="props.autofocus"
            ref="inputRef"
            v-model="model"
            :type="showPassword ? 'text' : 'password'"
            :class="cn('form-input pr-10', props.class)"
            v-bind="$attrs"
        />
        <input
            v-else
            v-focus="props.autofocus"
            ref="inputRef"
            :type="showPassword ? 'text' : 'password'"
            :class="cn('form-input pr-10', props.class)"
            v-bind="$attrs"
        />
        <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3.5 text-aura-moss transition-colors hover:text-aura-slate focus:outline-none"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :tabindex="-1"
        >
            <EyeOff v-if="showPassword" class="size-4" />
            <Eye v-else class="size-4" />
        </button>
    </div>
</template>
