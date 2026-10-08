<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Reset Password',
        description: 'Enter your email to receive a password reset link',
    },
});

defineProps<{
    status?: string;
}>();
</script>

<template>
    <div>
        <Head title="Forgot Password" />

        <div
            v-if="status"
            class="mb-6 rounded border border-aura-sage bg-aura-sage/30 p-3 text-center text-xs tracking-wider text-aura-slate uppercase"
        >
            {{ status }}
        </div>

        <Form v-bind="email.form()" v-slot="{ errors, processing }" class="space-y-5">
            <div>
                <label for="email" class="form-label">Email Address</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    autocomplete="off"
                    v-focus
                    placeholder="name@example.com"
                    class="form-input"
                />
                <InputError :message="errors.email" class="mt-1.5" />
            </div>

            <button
                type="submit"
                class="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-aura-slate px-6 py-3.5 text-[11px] font-medium tracking-widest text-white uppercase transition-colors duration-300 hover:bg-aura-moss disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="processing"
                data-test="email-password-reset-link-button"
            >
                <Spinner v-if="processing" class="size-4 animate-spin" />
                <span>Send Reset Link</span>
            </button>

            <div class="mt-6 border-t border-aura-sage/60 pt-4 text-center text-xs tracking-wider text-aura-moss">
                <span>Remember your password?</span>
                <Link
                    :href="login()"
                    class="ml-1 font-medium text-aura-slate underline underline-offset-4 decoration-aura-accent uppercase transition-colors hover:text-aura-moss hover:decoration-aura-slate"
                >
                    Return to Sign In
                </Link>
            </div>
        </Form>
    </div>
</template>
