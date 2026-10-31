import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { PracticalSummary } from '../types/practical';

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
 * Uses the Supabase client when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured,
 * and falls back to the backend /api/practicals database endpoint otherwise.
 */
export async function fetchPracticals(): Promise<PracticalSummary[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('practicals')
      .select('id, practical_number, practical_name, display_order, created_at')
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as PracticalSummary[];
    }
  }

  const response = await fetch('/api/practicals');
  if (!response.ok) {
    throw new Error('Failed to fetch practicals');
  }
  return response.json();
}

/**
 * Fetches the complete, unmodified source_code for a specific practical_number.
 */
export async function fetchPracticalSourceCode(practicalNumber: string): Promise<string> {
  if (supabase) {
    const { data, error } = await supabase
      .from('practicals')
      .select('source_code')
      .eq('practical_number', practicalNumber)
      .single();

    if (!error && data && typeof data.source_code === 'string') {
      return data.source_code;
    }
  }

  const response = await fetch(`/api/practicals/${encodeURIComponent(practicalNumber)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch source code for ${practicalNumber}`);
  }
  const record = await response.json();
  if (!record || typeof record.source_code !== 'string') {
    throw new Error(`No source code found for ${practicalNumber}`);
  }
  return record.source_code;
}
