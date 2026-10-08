/**
 * Admin content types for Journal, Pages, and Media library.
 */

export interface AdminJournalPostListItem {
    id: number;
    title: string;
    slug: string;
    category: string;
    read_time: string;
    is_featured: boolean;
    featured_image: string | null;
    is_published: boolean;
    published_at: string;
    created_at: string;
}

export interface AdminJournalPostFormData {
    id?: number;
    title: string;
    slug: string;
    category: string;
    read_time?: string;
    excerpt: string;
    body: string;
    featured_image: string | null;
    is_featured: boolean;
    published_at: string | null;
}

export interface AdminPageListItem {
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    route: string;
    status: string;
    updated_at: string;
}

export interface AdminMediaItem {
    id: string;
    title: string;
    url: string;
    type: string;
    size: string;
    created_at: string;
}
