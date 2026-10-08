<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { UserProfile } from '@/types/account';

defineProps<{
    user: UserProfile;
}>();
</script>

<template>
    <div
        class="max-w-xl rounded-2xl border border-aura-sage/50 bg-white p-8 shadow-soft"
    >
        <h3 class="font-serif text-2xl text-aura-slate">
            Personal Information
        </h3>
        <p class="mt-1 text-xs font-light text-aura-moss">
            Manage your contact email and profile credentials.
        </p>

        <div class="mt-6 space-y-4">
            <div>
                <span class="form-label">Full Name</span>
                <p
                    class="rounded border border-aura-sage/50 bg-aura-bg/50 px-4 py-3 text-sm text-aura-slate"
                >
                    {{ user.name }}
                </p>
            </div>

            <div>
                <span class="form-label">Email Address</span>
                <p
                    class="rounded border border-aura-sage/50 bg-aura-bg/50 px-4 py-3 text-sm text-aura-slate"
                >
                    {{ user.email }}
                </p>
            </div>

            <div class="pt-4">
                <Link
                    href="/settings/profile"
                    class="inline-block rounded bg-aura-slate px-6 py-3.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
                >
                    Edit Account in Settings
                </Link>
            </div>
        </div>
    </div>
</template>
