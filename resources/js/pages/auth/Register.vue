<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

defineProps<{
    passwordRules: string;
}>();

defineOptions({
    layout: {
        title: 'Create Account',
        description: 'Join the atelier for curated orders and exclusive access',
    },
});
</script>

<template>
    <div>
        <Head title="Create Account" />

        <Form
            v-bind="store.form()"
            :reset-on-success="['password', 'password_confirmation']"
            v-slot="{ errors, processing }"
            class="space-y-4"
        >
            <div>
                <label for="name" class="form-label">Full Name</label>
                <input
                    id="name"
                    type="text"
                    required
                    v-focus
                    :tabindex="1"
                    autocomplete="name"
                    name="name"
                    placeholder="Elenor Vance"
                    class="form-input"
                />
                <InputError :message="errors.name" class="mt-1" />
            </div>

            <div>
                <label for="email" class="form-label">Email Address</label>
                <input
                    id="email"
                    type="email"
                    required
                    :tabindex="2"
                    autocomplete="email"
                    name="email"
                    placeholder="name@example.com"
                    class="form-input"
                />
                <InputError :message="errors.email" class="mt-1" />
            </div>

            <div>
                <label for="password" class="form-label">Password</label>
                <PasswordInput
                    id="password"
                    required
                    :tabindex="3"
                    autocomplete="new-password"
                    name="password"
                    placeholder="••••••••"
                    :passwordrules="passwordRules"
                />
                <InputError :message="errors.password" class="mt-1" />
            </div>

            <div>
                <label for="password_confirmation" class="form-label">Confirm Password</label>
                <PasswordInput
                    id="password_confirmation"
                    required
                    :tabindex="4"
                    autocomplete="new-password"
                    name="password_confirmation"
                    placeholder="••••••••"
                    :passwordrules="passwordRules"
                />
                <InputError :message="errors.password_confirmation" class="mt-1" />
            </div>

            <button
                type="submit"
                class="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-aura-slate px-6 py-3.5 text-[11px] font-medium tracking-widest text-white uppercase transition-colors duration-300 hover:bg-aura-moss disabled:cursor-not-allowed disabled:opacity-60"
                :tabindex="5"
                :disabled="processing"
                data-test="register-user-button"
            >
                <Spinner v-if="processing" class="size-4 animate-spin" />
                <span>Create Account</span>
            </button>

            <div
                class="mt-6 border-t border-aura-sage/60 pt-4 text-center text-xs tracking-wider text-aura-moss"
            >
                Already have an account?
                <Link
                    :href="login()"
                    class="ml-1 font-medium text-aura-slate underline underline-offset-4 decoration-aura-accent uppercase transition-colors hover:text-aura-moss hover:decoration-aura-slate"
                    :tabindex="6"
                >
                    Sign In
                </Link>
            </div>
        </Form>
    </div>
</template>
