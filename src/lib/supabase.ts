import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { PracticalSummary } from '../types/practical';
import { PRACTICALS_DATABASE } from './practicalsStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project-id') &&
    supabaseAnonKey !== 'your-supabase-anon-public-key'
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Fetches the list of practical programs ordered by display_order.
 * 1. Queries Supabase when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured.
 * 2. Tries /api/practicals if running with the Express server.
 * 3. Falls back seamlessly to the built-in store on static hosts like Vercel.
 */
export async function fetchPracticals(): Promise<PracticalSummary[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('practicals')
        .select('id, practical_number, practical_name, display_order, created_at')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as PracticalSummary[];
      }
    } catch {
      // Fall through to API / static store if Supabase request fails
    }
  }

  try {
    const response = await fetch('/api/practicals');
    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data as PracticalSummary[];
      }
    }
  } catch {
    // Fall through to built-in store when deployed as a static site (e.g. Vercel)
  }

  return [...PRACTICALS_DATABASE]
    .sort((a, b) => a.display_order - b.display_order)
    .map(({ id, practical_number, practical_name, display_order, created_at }) => ({
      id,
      practical_number,
      practical_name,
      display_order,
      created_at,
    }));
}

/**
 * Fetches the complete, unmodified source_code for a specific practical_number.
 */
export async function fetchPracticalSourceCode(practicalNumber: string): Promise<string> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('practicals')
        .select('source_code')
        .eq('practical_number', practicalNumber)
        .single();

      if (!error && data && typeof data.source_code === 'string') {
        return data.source_code;
      }
    } catch {
      // Fall through to API / static store if Supabase request fails
    }
  }

  try {
    const response = await fetch(`/api/practicals/${encodeURIComponent(practicalNumber)}`);
    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      const record = await response.json();
      if (record && typeof record.source_code === 'string') {
        return record.source_code;
      }
    }
  } catch {
    // Fall through to built-in store when deployed as a static site (e.g. Vercel)
  }

  const fallbackRecord = PRACTICALS_DATABASE.find(
    (item) => item.practical_number.toUpperCase() === practicalNumber.toUpperCase()
  );

  if (!fallbackRecord) {
    throw new Error(`No source code found for ${practicalNumber}`);
  }

  return fallbackRecord.source_code;
}
