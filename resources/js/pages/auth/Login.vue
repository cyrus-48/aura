<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Sign In',
        description: 'Enter your credentials to access your account',
    },
});

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();
</script>

<template>
    <div>
        <Head title="Sign In" />

        <div
            v-if="status"
            class="mb-6 rounded border border-aura-sage bg-aura-sage/30 p-3 text-center text-xs tracking-wider text-aura-slate uppercase"
        >
            {{ status }}
        </div>

        <Form
            v-bind="store.form()"
            :reset-on-success="['password']"
            v-slot="{ errors, processing }"
            class="space-y-5"
        >
            <div>
                <label for="email" class="form-label">Email Address</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    v-focus
                    :tabindex="1"
                    autocomplete="email"
                    placeholder="name@example.com"
                    class="form-input"
                />
                <InputError :message="errors.email" class="mt-1.5" />
            </div>

            <div>
                <div class="mb-2 flex items-center justify-between">
                    <label for="password" class="form-label mb-0">Password</label>
                    <Link
                        v-if="canResetPassword"
                        :href="request()"
                        class="text-[11px] tracking-wider text-aura-moss uppercase transition-colors hover:text-aura-slate"
                        :tabindex="5"
                    >
                        Forgot password?
                    </Link>
                </div>
                <PasswordInput
                    id="password"
                    name="password"
                    required
                    :tabindex="2"
                    autocomplete="current-password"
                    placeholder="••••••••"
                />
                <InputError :message="errors.password" class="mt-1.5" />
            </div>

            <div class="flex items-center justify-between pt-1">
                <label
                    for="remember"
                    class="flex cursor-pointer items-center gap-2.5 select-none"
                >
                    <input
                        id="remember"
                        type="checkbox"
                        name="remember"
                        :tabindex="3"
                        class="custom-checkbox"
                    />
                    <span class="text-xs tracking-wide text-aura-moss">Remember me</span>
                </label>
            </div>

            <button
                type="submit"
                class="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-aura-slate px-6 py-3.5 text-[11px] font-medium tracking-widest text-white uppercase transition-colors duration-300 hover:bg-aura-moss disabled:cursor-not-allowed disabled:opacity-60"
                :tabindex="4"
                :disabled="processing"
                data-test="login-button"
            >
                <Spinner v-if="processing" class="size-4 animate-spin" />
                <span>Sign In</span>
            </button>

            <div
                class="mt-6 border-t border-aura-sage/60 pt-4 text-center text-xs tracking-wider text-aura-moss"
            >
                Don't have an account?
                <Link
                    :href="register()"
                    class="ml-1 font-medium text-aura-slate underline underline-offset-4 decoration-aura-accent uppercase transition-colors hover:text-aura-moss hover:decoration-aura-slate"
                    :tabindex="6"
                >
                    Create Account
                </Link>
            </div>
        </Form>
    </div>
</template>
