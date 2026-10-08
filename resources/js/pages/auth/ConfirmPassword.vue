<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';

defineOptions({
    layout: {
        title: 'Confirm Password',
        description:
            'This is a secure area of the application. Please confirm your password before continuing.',
    },
});
</script>

<template>
    <div>
        <Head title="Confirm Password" />

        <Form
            v-bind="store.form()"
            reset-on-success
            v-slot="{ errors, processing }"
            class="space-y-5"
        >
            <div>
                <label for="password" class="form-label">Password</label>
                <PasswordInput
                    id="password"
                    name="password"
                    required
                    autocomplete="current-password"
                    autofocus
                    placeholder="••••••••"
                />
                <InputError :message="errors.password" class="mt-1.5" />
            </div>

            <button
                type="submit"
                class="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-aura-slate px-6 py-3.5 text-[11px] font-medium tracking-widest text-white uppercase transition-colors duration-300 hover:bg-aura-moss disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="processing"
                data-test="confirm-password-button"
            >
                <Spinner v-if="processing" class="size-4 animate-spin" />
                <span>Confirm Password</span>
            </button>
        </Form>
    </div>
</template>
