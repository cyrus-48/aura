<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import FormField from '@/components/admin/FormField.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminJournalPostFormData } from '@/types/content_admin';

const props = defineProps<{
    post: AdminJournalPostFormData | null;
}>();

const isEditing = computed(() => !!props.post);

const form = useForm({
    title: props.post?.title ?? '',
    slug: props.post?.slug ?? '',
    category: props.post?.category ?? 'Craftsmanship',
    read_time: props.post?.read_time ?? '4 min read',
    excerpt: props.post?.excerpt ?? '',
    body: props.post?.body ?? '',
    featured_image: props.post?.featured_image ?? '',
    is_featured: props.post?.is_featured ?? false,
    published_at: props.post?.published_at ?? new Date().toISOString().slice(0, 10),
});

const submit = (): void => {
    if (isEditing.value && props.post?.id) {
        form.put(`/admin/journal/${props.post.id}`);
    } else {
        form.post('/admin/journal');
    }
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Journal', href: '/admin/journal' }, { label: isEditing ? 'Edit Story' : 'New Story' }]">
        <Head :title="`${isEditing ? 'Edit Story' : 'New Story'} | Aura & Oak Admin`" />

        <AdminPageHeader
            :title="isEditing ? `Edit Story: ${post?.title}` : 'Draft New Story'"
            :subtitle="`Author evocative long-form editorial pieces for the storefront journal.`"
        >
            <template #actions>
                <div class="flex items-center space-x-3">
                    <Link href="/admin/journal" class="rounded-lg border border-aura-sage px-4 py-2 text-xs font-semibold text-aura-moss hover:bg-white">
                        Cancel
                    </Link>
                    <button
                        type="button"
                        :disabled="form.processing"
                        class="rounded-lg bg-aura-slate px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-aura-slate/90 disabled:opacity-50 cursor-pointer"
                        @click="submit"
                    >
                        {{ isEditing ? 'Save Changes' : 'Publish Article' }}
                    </button>
                </div>
            </template>
        </AdminPageHeader>

        <form @submit.prevent="submit" class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="space-y-6 lg:col-span-2">
                <div class="rounded-xl border border-aura-sage bg-white p-6 shadow-card space-y-4">
                    <FormField label="Story Headline / Title" required :error="form.errors.title">
                        <input v-model="form.title" type="text" placeholder="e.g. The Quiet Geometry of Japanese Joinery" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                    </FormField>
                    <FormField label="URL Slug" :error="form.errors.slug">
                        <input v-model="form.slug" type="text" placeholder="auto-generated-from-title" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate font-mono focus:border-aura-slate focus:outline-none" />
                    </FormField>
                    <FormField label="Excerpt (Summary snippet for cards)" required :error="form.errors.excerpt">
                        <textarea v-model="form.excerpt" rows="2" placeholder="Concise overview snippet..." class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"></textarea>
                    </FormField>
                    <FormField label="Article Body (Markdown / Editorial Content)" required :error="form.errors.body">
                        <textarea v-model="form.body" rows="12" placeholder="Write your full story here..." class="w-full rounded-lg border border-aura-sage p-3 text-xs text-aura-slate font-mono focus:border-aura-slate focus:outline-none"></textarea>
                    </FormField>
                </div>
            </div>

            <div class="space-y-6 lg:col-span-1">
                <div class="rounded-xl border border-aura-sage bg-white p-6 shadow-card space-y-4">
                    <h3 class="font-serif text-sm font-semibold text-aura-slate">Publishing & Metadata</h3>
                    <FormField label="Category" required :error="form.errors.category">
                        <select v-model="form.category" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none">
                            <option value="Craftsmanship">Craftsmanship</option>
                            <option value="Living">Living</option>
                            <option value="Materials">Materials</option>
                            <option value="Ritual">Ritual</option>
                            <option value="Architecture">Architecture</option>
                        </select>
                    </FormField>
                    <FormField label="Estimated Read Time" :error="form.errors.read_time">
                        <input v-model="form.read_time" type="text" placeholder="e.g. 5 min read" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                    </FormField>
                    <FormField label="Featured Cover Image URL" :error="form.errors.featured_image">
                        <input v-model="form.featured_image" type="text" placeholder="https://..." class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                    </FormField>
                    <FormField label="Publish Date" :error="form.errors.published_at">
                        <input v-model="form.published_at" type="date" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                    </FormField>
                    <div class="flex items-center space-x-2 pt-2">
                        <input id="is_featured" v-model="form.is_featured" type="checkbox" class="h-4 w-4 rounded border-aura-sage text-aura-slate accent-aura-slate" />
                        <label for="is_featured" class="text-xs text-aura-slate font-medium cursor-pointer">Feature on journal homepage header</label>
                    </div>
                </div>
            </div>
        </form>
    </AdminLayout>
</template>
