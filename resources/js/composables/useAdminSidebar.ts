import { ref } from 'vue';

const isCollapsed = ref(false);
const isMobileOpen = ref(false);

export function useAdminSidebar() {
    const toggleCollapse = () => {
        isCollapsed.value = !isCollapsed.value;
    };

    const toggleMobile = () => {
        isMobileOpen.value = !isMobileOpen.value;
    };

    const closeMobile = () => {
        isMobileOpen.value = false;
    };

    return {
        isCollapsed,
        isMobileOpen,
        toggleCollapse,
        toggleMobile,
        closeMobile,
    };
}
