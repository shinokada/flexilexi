import type { FuseResult } from 'fuse.js';
import Fuse from 'fuse.js';

// Type Definitions
export type DataItem = Record<string, string | number | boolean>;

export interface FuzzySearchOptions {
  /** Array of objects or single object to search through */
  data: DataItem[] | DataItem;
  /** Fields to search in (defaults to all keys in first data item) */
  keys?: string[];
  /** Initial fuzziness threshold (0.0 = exact, 1.0 = match anything) */
  thresholdValue?: number;
  /** Debounce delay for search in milliseconds */
  debounceMs?: number;
}

export interface FuzzySearchReturn {
  /** Current search query */
  searchQuery: string;
  /** Update search query */
  setSearchQuery: (query: string) => void;
  /** Current threshold value */
  threshold: number;
  /** Update threshold value */
  setThreshold: (value: number) => void;
  /** Debounced search query */
  debouncedQuery: string;
  /** Search results */
  results: FuseResult<DataItem>[];
  /** Normalized data array */
  dataArray: DataItem[];
  /** Detected or provided search keys */
  searchKeys: string[];
  /** Is currently searching */
  isSearching: boolean;
}

/**
 * Composable for fuzzy search functionality
 * Returns reactive state and methods for searching through data
 */
export function useFuzzySearch(options: FuzzySearchOptions): FuzzySearchReturn {
  const { data, keys = [], thresholdValue = 0.6, debounceMs = 300 } = options;

  // State
  let searchQuery = $state('');
  let threshold = $state(thresholdValue);
  let debouncedQuery = $state('');
  let debounceTimer = $state<number | undefined>(undefined);

  // Normalize data to array format
  const dataArray = $derived.by(() => {
    if (Array.isArray(data)) {
      return data as DataItem[];
    } else if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([key, value]) => ({
        key,
        value: String(value)
      }));
    }
    return [];
  });

  // Extract keys dynamically if not provided
  const searchKeys = $derived.by(() => {
    if (keys.length > 0) {
      return keys;
    }
    if (dataArray.length > 0) {
      return Object.keys(dataArray[0]);
    }
    return ['key', 'value'];
  });

  // Fuse configuration
  const fuseOptions = $derived({
    keys: searchKeys,
    threshold: 0.9, // Permissive - filter by user threshold later
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 1,
    shouldSort: true,
    location: 0,
    distance: 100
  });

  // Create Fuse instance
  const fuse = $derived(new Fuse(dataArray, fuseOptions));

  // Search results
  const results = $derived.by((): FuseResult<DataItem>[] => {
    if (!debouncedQuery.trim()) {
      return [];
    }

    const allResults = fuse.search(debouncedQuery);
    const userThreshold = threshold;

    return allResults.filter((result) => {
      return result.score !== undefined && result.score <= userThreshold;
    });
  });

  // Is searching
  const isSearching = $derived(searchQuery !== debouncedQuery);

  // Methods
  function setSearchQuery(query: string) {
    searchQuery = query;

    if (debounceTimer !== undefined) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = window.setTimeout(() => {
      debouncedQuery = query;
    }, debounceMs);
  }

  function setThreshold(value: number) {
    threshold = value;
  }

  // Cleanup effect
  $effect(() => {
    return () => {
      if (debounceTimer !== undefined) {
        clearTimeout(debounceTimer);
      }
    };
  });

  return {
    get searchQuery() {
      return searchQuery;
    },
    setSearchQuery,
    get threshold() {
      return threshold;
    },
    setThreshold,
    get debouncedQuery() {
      return debouncedQuery;
    },
    get results() {
      return results;
    },
    get dataArray() {
      return dataArray;
    },
    get searchKeys() {
      return searchKeys;
    },
    get isSearching() {
      return isSearching;
    }
  };
}
