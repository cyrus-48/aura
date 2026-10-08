<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

defineOptions({
    layout: {
        title: 'New Password',
        description: 'Please set your new password below',
    },
});

const props = defineProps<{
    token: string;
    email: string;
    passwordRules: string;
}>();

const inputEmail = ref(props.email);
</script>

<template>
    <div>
        <Head title="Reset Password" />

        <Form
            v-bind="update.form()"
            :transform="(data) => ({ ...data, token, email })"
            :reset-on-success="['password', 'password_confirmation']"
            v-slot="{ errors, processing }"
            class="space-y-4"
        >
            <div>
                <label for="email" class="form-label">Email Address</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    v-model="inputEmail"
                    class="form-input cursor-not-allowed bg-aura-bg/60 text-aura-moss"
                    readonly
                />
                <InputError :message="errors.email" class="mt-1" />
            </div>

            <div>
                <label for="password" class="form-label">New Password</label>
                <PasswordInput
                    id="password"
                    name="password"
                    autocomplete="new-password"
                    autofocus
                    placeholder="••••••••"
                    :passwordrules="passwordRules"
                />
                <InputError :message="errors.password" class="mt-1" />
            </div>

            <div>
                <label for="password_confirmation" class="form-label">Confirm New Password</label>
                <PasswordInput
                    id="password_confirmation"
                    name="password_confirmation"
                    autocomplete="new-password"
                    placeholder="••••••••"
                    :passwordrules="passwordRules"
                />
                <InputError :message="errors.password_confirmation" class="mt-1" />
            </div>

            <button
                type="submit"
                class="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-aura-slate px-6 py-3.5 text-[11px] font-medium tracking-widest text-white uppercase transition-colors duration-300 hover:bg-aura-moss disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="processing"
                data-test="reset-password-button"
            >
                <Spinner v-if="processing" class="size-4 animate-spin" />
                <span>Reset Password</span>
            </button>
        </Form>
    </div>
</template>
