/**
 * Types representing editorial journal articles.
 * Mirrors Laravel API Resources: JournalPostResource.
 */

export interface JournalArticle {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string | null;
    featuredImage: string | null;
    readingTime: string | null;
    isFeatured: boolean;
    publishedAt: string | null;
}
