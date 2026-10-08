import { onMounted, onUnmounted, ref } from 'vue';

const isOpen = ref(false);

export function useCommandPalette() {
    const open = () => {
        isOpen.value = true;
    };

    const close = () => {
        isOpen.value = false;
    };

    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            toggle();
        } else if (event.key === 'Escape' && isOpen.value) {
            close();
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeydown);
    });

    return {
        isOpen,
        open,
        close,
        toggle,
    };
}
