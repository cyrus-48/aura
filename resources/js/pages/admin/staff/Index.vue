<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import AdminModal from '@/components/admin/AdminModal.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable.vue';
import FormField from '@/components/admin/FormField.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminStaffMember } from '@/types/settings_admin';

defineProps<{
    staff: AdminStaffMember[];
}>();

const isModalOpen = ref(false);

const form = useForm({
    name: '',
    email: '',
    role: 'manager',
    password: '',
});

const columns: DataTableColumn[] = [
    { key: 'name', label: 'Operator' },
    { key: 'role', label: 'Access Role' },
    { key: 'created_at', label: 'Joined', align: 'right' },
    { key: 'actions', label: '', align: 'right' },
];

const openCreate = (): void => {
    form.reset();
    isModalOpen.value = true;
};

const submitStaff = (): void => {
    form.post('/admin/staff', {
        onSuccess: () => {
            isModalOpen.value = false;
            form.reset();
        },
    });
};

const deleteStaff = (member: AdminStaffMember): void => {
    if (confirm(`Remove ${member.name} from staff access?`)) {
        router.delete(`/admin/staff/${member.id}`);
    }
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Staff' }]">
        <Head title="Staff Access | Aura & Oak Admin" />

        <AdminPageHeader
            title="Internal Staff & Permissions"
            :subtitle="`Manage operator credentials, roles, and administrative access for the atelier team.`"
        >
            <template #actions>
                <button
                    type="button"
                    class="inline-flex cursor-pointer items-center rounded-lg bg-aura-slate px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-aura-slate/90"
                    @click="openCreate"
                >
                    <i class="fa-solid fa-user-plus mr-2 text-[10px]"></i>
                    Add Staff Member
                </button>
            </template>
        </AdminPageHeader>

        <div class="mt-6 overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <DataTable :columns="columns" :rows="staff" row-key="id">
                <template #name="{ row }">
                    <div class="flex items-center space-x-3">
                        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-aura-slate font-serif text-xs font-semibold text-white">
                            {{ row.name.slice(0, 2).toUpperCase() }}
                        </div>
                        <div>
                            <p class="font-medium text-aura-slate text-xs">{{ row.name }} <span v-if="row.is_current_user" class="text-[10px] text-aura-moss font-normal">(You)</span></p>
                            <p class="text-[11px] text-aura-moss">{{ row.email }}</p>
                        </div>
                    </div>
                </template>
                <template #role="{ row }">
                    <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold', row.role_color]">
                        {{ row.role_label }}
                    </span>
                </template>
                <template #created_at="{ row }">
                    <span class="text-xs text-aura-moss">{{ row.created_at }}</span>
                </template>
                <template #actions="{ row }">
                    <button
                        v-if="!row.is_current_user"
                        type="button"
                        class="text-aura-moss hover:text-rose-600 cursor-pointer p-1"
                        title="Remove Staff"
                        @click="deleteStaff(row)"
                    >
                        <i class="fa-regular fa-trash-can text-xs"></i>
                    </button>
                </template>
            </DataTable>
        </div>

        <AdminModal :is-open="isModalOpen" title="Invite / Add Staff Member" @close="isModalOpen = false">
            <form @submit.prevent="submitStaff" class="space-y-4">
                <FormField label="Full Name" required :error="form.errors.name">
                    <input v-model="form.name" type="text" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                </FormField>
                <FormField label="Work Email" required :error="form.errors.email">
                    <input v-model="form.email" type="email" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                </FormField>
                <FormField label="Staff Role" required :error="form.errors.role">
                    <select v-model="form.role" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none">
                        <option value="manager">Manager (Inventory, Orders & Content)</option>
                        <option value="support">Support (Orders & Customers)</option>
                        <option value="admin">Administrator (Full Access)</option>
                    </select>
                </FormField>
                <FormField label="Initial Password" required :error="form.errors.password">
                    <input v-model="form.password" type="password" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                </FormField>
                <div class="mt-6 flex justify-end space-x-3 border-t border-aura-sage pt-4">
                    <button type="button" class="rounded-lg border border-aura-sage px-4 py-2 text-xs text-aura-moss cursor-pointer" @click="isModalOpen = false">Cancel</button>
                    <button type="submit" :disabled="form.processing" class="rounded-lg bg-aura-slate px-4 py-2 text-xs font-semibold text-white disabled:opacity-50 cursor-pointer">Create Account</button>
                </div>
            </form>
        </AdminModal>
    </AdminLayout>
</template>
