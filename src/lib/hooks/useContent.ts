import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ContentItem {
  id: string;
  page_key: string;
  title: string | null;
  content: string | null;
  metadata: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface UseContentOptions {
  key?: string;
  keys?: string[];
  page?: string;
  autoLoad?: boolean;
}

interface UseContentReturn {
  content: ContentItem | null;
  contentMap: Record<string, ContentItem>;
  contentList: ContentItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing content from the CMS
 * 
 * @param options Configuration options
 * @returns Content data, loading state, error state, and refetch function
 * 
 * @example
 * // Get single content item
 * const { content, loading } = useContent({ key: 'home_hero_title' });
 * 
 * @example
 * // Get multiple content items
 * const { contentMap, loading } = useContent({ keys: ['home_hero_title', 'home_hero_subtitle'] });
 * 
 * @example
 * // Get all content for a page
 * const { contentList, loading } = useContent({ page: 'home' });
 */
export function useContent(options: UseContentOptions = {}): UseContentReturn {
  const { key, keys, page, autoLoad = true } = options;
  
  const [content, setContent] = useState<ContentItem | null>(null);
  const [contentMap, setContentMap] = useState<Record<string, ContentItem>>({});
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      if (key) {
        // Fetch single content item
        const { data, error: fetchError } = await supabase
          .from('page_content')
          .select('*')
          .eq('page_key', key)
          .eq('is_active', true)
          .single();

        if (fetchError) {
          setError(fetchError.message);
          setContent(null);
        } else {
          setContent(data);
        }
      } else if (keys && keys.length > 0) {
        // Fetch multiple content items
        const { data, error: fetchError } = await supabase
          .from('page_content')
          .select('*')
          .in('page_key', keys)
          .eq('is_active', true);

        if (fetchError) {
          setError(fetchError.message);
          setContentMap({});
        } else {
          const map: Record<string, ContentItem> = {};
          data?.forEach((item) => {
            map[item.page_key] = item;
          });
          setContentMap(map);
          setContentList(data || []);
        }
      } else if (page) {
        // Fetch all content for a specific page
        const { data, error: fetchError } = await supabase
          .from('page_content')
          .select('*')
          .ilike('page_key', `${page}_%`)
          .eq('is_active', true)
          .order('page_key', { ascending: true });

        if (fetchError) {
          setError(fetchError.message);
          setContentList([]);
        } else {
          const map: Record<string, ContentItem> = {};
          data?.forEach((item) => {
            map[item.page_key] = item;
          });
          setContentMap(map);
          setContentList(data || []);
        }
      } else {
        // Fetch all active content
        const { data, error: fetchError } = await supabase
          .from('page_content')
          .select('*')
          .eq('is_active', true)
          .order('page_key', { ascending: true });

        if (fetchError) {
          setError(fetchError.message);
          setContentList([]);
        } else {
          const map: Record<string, ContentItem> = {};
          data?.forEach((item) => {
            map[item.page_key] = item;
          });
          setContentMap(map);
          setContentList(data || []);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      fetchContent();
    }
  }, [key, keys?.join(','), page, autoLoad]);

  return {
    content,
    contentMap,
    contentList,
    loading,
    error,
    refetch: fetchContent,
  };
}

/**
 * Helper function to get content value with fallback
 */
export function getContentValue(
  content: ContentItem | null | undefined,
  defaultValue: string = ''
): string {
  return content?.content || defaultValue;
}

/**
 * Helper function to get metadata value with fallback
 */
export function getMetadataValue(
  content: ContentItem | null | undefined,
  key: string,
  defaultValue: any = null
): any {
  if (!content?.metadata) return defaultValue;
  try {
    const metadata = typeof content.metadata === 'string' 
      ? JSON.parse(content.metadata)
      : content.metadata;
    return metadata[key] ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Helper function to parse array metadata
 */
export function getMetadataArray<T = any>(
  content: ContentItem | null | undefined,
  key: string,
  defaultValue: T[] = []
): T[] {
  const value = getMetadataValue(content, key, defaultValue);
  return Array.isArray(value) ? value : defaultValue;
}
