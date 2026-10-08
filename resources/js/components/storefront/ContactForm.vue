<script setup lang="ts">
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

defineProps<{
    form: ContactFormData;
    processing: boolean;
    errors: Record<string, string>;
}>();

const emit = defineEmits<{
    (e: 'submit'): void;
}>();
</script>

<template>
    <div>
        <h2 class="mb-8 font-serif text-3xl text-aura-slate md:text-4xl">
            Send Us a Message
        </h2>

        <form class="space-y-8" @submit.prevent="emit('submit')">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <label for="contact-name" class="form-label">
                        Full Name *
                    </label>
                    <input
                        id="contact-name"
                        v-model="form.name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        class="form-input"
                    />
                    <p v-if="errors.name" class="mt-1 text-xs text-red-600">
                        {{ errors.name }}
                    </p>
                </div>

                <div>
                    <label for="contact-email" class="form-label">
                        Email Address *
                    </label>
                    <input
                        id="contact-email"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        class="form-input"
                    />
                    <p v-if="errors.email" class="mt-1 text-xs text-red-600">
                        {{ errors.email }}
                    </p>
                </div>
            </div>

            <div>
                <label for="contact-subject" class="form-label">
                    Subject
                </label>
                <input
                    id="contact-subject"
                    v-model="form.subject"
                    type="text"
                    placeholder="General Inquiry, Order Support, Bespoke..."
                    class="form-input"
                />
            </div>

            <div>
                <label for="contact-message" class="form-label">
                    Message *
                </label>
                <textarea
                    id="contact-message"
                    v-model="form.message"
                    required
                    rows="5"
                    placeholder="How can our concierge assist you today?"
                    class="form-input resize-none"
                />
                <p v-if="errors.message" class="mt-1 text-xs text-red-600">
                    {{ errors.message }}
                </p>
            </div>

            <button
                type="submit"
                :disabled="processing"
                class="flex w-full items-center justify-center rounded bg-aura-slate py-4 text-[11px] font-medium tracking-widest text-white uppercase transition duration-300 hover:bg-aura-moss disabled:opacity-50 sm:w-auto sm:px-8"
            >
                <span v-if="processing">Sending...</span>
                <span v-else>Send Message</span>
            </button>
        </form>
    </div>
</template>
