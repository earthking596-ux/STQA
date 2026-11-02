import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { PracticalSummary } from '../types/practical';
import { PRACTICALS_DATABASE } from './practicalsStore';

const DEFAULT_SUPABASE_URL = 'https://gdnytwtrilbrtjsbridg.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdkbnl0d3RyaWxicnRqc2JyaWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MzE1NjAsImV4cCI6MjEwOTAwNzU2MH0.In1H9vvUCPUdsakQnzqR27V23K4mGSITJsX9FMOrXC8';

function normalizeSupabaseUrl(rawUrl: string | undefined): string {
  const url = (rawUrl || DEFAULT_SUPABASE_URL).trim();
  if (!url || url.includes('your-project-id')) {
    return DEFAULT_SUPABASE_URL;
  }
  return url.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
}

function resolveSupabaseAnonKey(rawKey: string | undefined): string {
  const key = (rawKey || DEFAULT_SUPABASE_ANON_KEY).trim();
  if (!key || key === 'your-supabase-anon-public-key') {
    return DEFAULT_SUPABASE_ANON_KEY;
  }
  return key;
}

const supabaseUrl = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL as string | undefined);
const supabaseAnonKey = resolveSupabaseAnonKey(
  import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetches the list of practical programs ordered by display_order.
 * Merges with PRACTICALS_DATABASE so P01-P09 and updated names/codes are always present
 * even if the remote Supabase table still has older rows.
 */
export async function fetchPracticals(): Promise<PracticalSummary[]> {
  const localMap = new Map(
    PRACTICALS_DATABASE.map((item) => [item.practical_number.toUpperCase(), item])
  );

  try {
    const { data, error } = await supabase
      .from('practicals')
      .select('id, practical_number, practical_name, display_order, created_at')
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      const mergedMap = new Map<string, PracticalSummary>();

      // Ensure all P01-P09 records with updated titles and ordering are included
      for (const localItem of PRACTICALS_DATABASE) {
        mergedMap.set(localItem.practical_number.toUpperCase(), {
          id: localItem.id,
          practical_number: localItem.practical_number,
          practical_name: localItem.practical_name,
          display_order: localItem.display_order,
          created_at: localItem.created_at,
        });
      }

      // Include any extra custom practicals added in Supabase beyond P01-P09
      for (const remoteItem of data as PracticalSummary[]) {
        const key = remoteItem.practical_number.toUpperCase();
        if (!localMap.has(key)) {
          mergedMap.set(key, remoteItem);
        }
      }

      return Array.from(mergedMap.values()).sort((a, b) => a.display_order - b.display_order);
    }
  } catch {
    // Fall through if Supabase query fails
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
 * Prioritizes the updated P01-P09 definitions and queries Supabase for any additional records.
 */
export async function fetchPracticalSourceCode(practicalNumber: string): Promise<string> {
  const normalizedKey = practicalNumber.toUpperCase();
  const localRecord = PRACTICALS_DATABASE.find(
    (item) => item.practical_number.toUpperCase() === normalizedKey
  );

  // Use the authoritative updated code for P01-P09 so older un-migrated Supabase rows don't serve stale P03/P05 code
  if (localRecord) {
    return localRecord.source_code;
  }

  try {
    const { data, error } = await supabase
      .from('practicals')
      .select('source_code')
      .eq('practical_number', practicalNumber)
      .single();

    if (!error && data && typeof data.source_code === 'string' && data.source_code.trim().length > 0) {
      return data.source_code;
    }
  } catch {
    // Fall through if Supabase query fails
  }

  throw new Error(`No source code found for ${practicalNumber}`);
}
