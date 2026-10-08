/**
 * Pure utility functions for formatting, string manipulation, and timing.
 * Strict rules: No reactivity, no DOM access, no network calls, no Vue/Inertia imports.
 */

/**
 * Format a number as a localized currency string.
 */
export function formatPrice(
    value: number | string | null | undefined,
    currency = 'USD',
): string {
    const numericValue =
        typeof value === 'string' ? parseFloat(value) : (value ?? 0);
    const validNumber = isNaN(numericValue) ? 0 : numericValue;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(validNumber);
}

/**
 * Format a date string or Date object into a readable date string.
 */
export function formatDate(
    value: string | Date | null | undefined,
    options?: Intl.DateTimeFormatOptions,
): string {
    if (!value) {
        return '';
    }

    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) {
        return '';
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options ?? defaultOptions).format(
        date,
    );
}

/**
 * Format a date into relative time (e.g., "3 hours ago", "2 days ago").
 */
export function formatRelativeTime(
    value: string | Date | null | undefined,
): string {
    if (!value) {
        return '';
    }

    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) {
        return '';
    }

    const elapsedSeconds = Math.round((date.getTime() - Date.now()) / 1000);
    const rtf = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });

    const cutoffs = [
        { unit: 'year' as const, seconds: 31536000 },
        { unit: 'month' as const, seconds: 2592000 },
        { unit: 'day' as const, seconds: 86400 },
        { unit: 'hour' as const, seconds: 3600 },
        { unit: 'minute' as const, seconds: 60 },
        { unit: 'second' as const, seconds: 1 },
    ];

    for (const { unit, seconds } of cutoffs) {
        if (Math.abs(elapsedSeconds) >= seconds || unit === 'second') {
            return rtf.format(Math.round(elapsedSeconds / seconds), unit);
        }
    }

    return '';
}

/**
 * Generate a URL-friendly slug from text.
 */
export function slugify(value: string): string {
    if (!value) {
        return '';
    }

    return value
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Truncate a string to a given maximum character length with ellipsis.
 */
export function truncate(
    value: string | null | undefined,
    length = 100,
    suffix = '...',
): string {
    if (!value) {
        return '';
    }

    if (value.length <= length) {
        return value;
    }

    return value.slice(0, length).trimEnd() + suffix;
}

/**
 * Extract uppercase initials from a person's full name.
 */
export function getInitials(name: string | null | undefined): string {
    if (!name) {
        return '';
    }

    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
        return '';
    }

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Debounce a callback function by a specified delay in milliseconds.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay = 300,
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return (...args: Parameters<T>): void => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
