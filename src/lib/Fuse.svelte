<script lang="ts">
  import type { FuseResult, FuseResultMatch } from 'fuse.js';
  import Fuse from 'fuse.js';

  // Type Definitions
  type DataItem = Record<string, string | number | boolean>;

  interface Props {
    /** Array of objects to search through */
    data: DataItem[];
    /** Fields to search in (defaults to all keys in first data item) */
    keys?: string[];
    /** Fields to display in results (defaults to keys) */
    displayFields?: string[];
    /** Fuzziness threshold (0.0 = exact, 1.0 = match anything) */
    threshold?: number;
    /** Placeholder text for search input */
    placeholder?: string;
    /** Enable autofocus on search input */
    autofocus?: boolean;
    /** Debounce delay for search in milliseconds */
    debounce?: number;
    /** Maximum number of results to display */
    maxResults?: number;
    /** Show match highlights */
    highlightMatches?: boolean;
    /** Show search score */
    showScore?: boolean;
    /** Enable keyboard navigation */
    keyboardNav?: boolean;
    /** Custom CSS class for container */
    class?: string;
    /** Custom CSS class for input */
    inputClass?: string;
    /** Custom CSS class for results list */
    resultsClass?: string;
    /** Custom CSS class for result items */
    resultItemClass?: string;
    /** Callback when a result is selected */
    onselect?: (item: DataItem) => void;
    /** Callback when search is performed */
    onsearch?: (query: string, results: FuseResult<DataItem>[]) => void;
  }

  let {
    data = [],
    keys = [],
    displayFields = [],
    threshold = 0.4,
    placeholder = 'Search...',
    autofocus = false,
    debounce = 150,
    maxResults = 50,
    highlightMatches = true,
    showScore = false,
    keyboardNav = true,
    class: className = '',
    inputClass = '',
    resultsClass = '',
    resultItemClass = '',
    onselect,
    onsearch
  }: Props = $props();

  // State
  let searchQuery = $state('');
  let debouncedQuery = $state('');
  let debounceTimer = $state<number | undefined>(undefined);
  let selectedIndex = $state(-1);
  let inputElement = $state<HTMLInputElement>();
  let resultsVisible = $state(false);

  // Extract keys dynamically if not provided
  const searchKeys = $derived.by(() => {
    if (keys.length > 0) return keys;
    if (data.length > 0) return Object.keys(data[0]);
    return [];
  });

  // Fields to display (defaults to searchKeys)
  const fields = $derived(displayFields.length > 0 ? displayFields : searchKeys);

  // Fuse.js configuration
  // We use JSON.stringify to ensure stability of keys even if the array reference changes
  const keysJson = $derived(JSON.stringify(searchKeys));

  const fuseOptions = $derived.by(() => {
    return {
      keys: JSON.parse(keysJson),
      threshold,
      includeScore: true,
      includeMatches: highlightMatches,
      minMatchCharLength: 1,
      shouldSort: true,
      location: 0,
      distance: 100
    };
  });

  // Create Fuse instance
  const fuse = $derived(new Fuse(data, fuseOptions));

  // Search results
  const searchResults = $derived.by((): FuseResult<DataItem>[] => {
    if (!debouncedQuery.trim()) return [];

    const results = fuse.search(debouncedQuery);
    const limited = results.slice(0, maxResults);

    return limited;
  });

  import { untrack } from 'svelte';

  // Call onsearch callback when results change
  // We untrack onsearch to prevent the effect from re-running if only the callback identity changes
  // but the query/results are stable.
  $effect(() => {
    const query = debouncedQuery;
    const results = searchResults;

    untrack(() => {
      if (query && onsearch) {
        onsearch(query, results);
      }
    });
  });

  // Debounced search handler
  function handleInput() {
    if (debounceTimer !== undefined) {
      clearTimeout(debounceTimer);
    }

    selectedIndex = -1;
    resultsVisible = true;

    debounceTimer = window.setTimeout(() => {
      debouncedQuery = searchQuery;
    }, debounce);
  }

  // Keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    if (!keyboardNav || searchResults.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
        scrollToSelected();
        break;
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        scrollToSelected();
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          selectResult(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        resultsVisible = false;
        selectedIndex = -1;
        break;
    }
  }

  // Select a result
  function selectResult(result: FuseResult<DataItem>) {
    if (onselect) {
      onselect(result.item);
    }
    resultsVisible = false;
    selectedIndex = -1;
  }

  // Scroll to selected item
  function scrollToSelected() {
    const selectedElement = document.querySelector(`[data-result-index="${selectedIndex}"]`);
    selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // Highlight matching text - escapes HTML to prevent XSS
  function escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function highlightText(text: string, matches?: readonly FuseResultMatch[]): string {
    if (!highlightMatches || !matches || matches.length === 0) {
      return escapeHtml(text);
    }

    const indices: [number, number][] = [];
    for (const match of matches) {
      if (match.indices) {
        indices.push(...match.indices);
      }
    }

    if (indices.length === 0) return escapeHtml(text);

    // Sort and merge overlapping indices
    indices.sort((a, b) => a[0] - b[0]);
    const merged: [number, number][] = [indices[0]];

    for (let i = 1; i < indices.length; i++) {
      const last = merged[merged.length - 1];
      const current = indices[i];

      if (current[0] <= last[1] + 1) {
        last[1] = Math.max(last[1], current[1]);
      } else {
        merged.push(current);
      }
    }

    // Build highlighted string with escaped HTML
    let result = '';
    let lastIndex = 0;

    for (const [start, end] of merged) {
      result += escapeHtml(text.slice(lastIndex, start));
      result += `<mark class="fuse-highlight">${escapeHtml(text.slice(start, end + 1))}</mark>`;
      lastIndex = end + 1;
    }
    result += escapeHtml(text.slice(lastIndex));

    return result;
  }

  // Get highlighted value for a field
  function getHighlightedValue(result: FuseResult<DataItem>, field: string): string {
    const value = result.item[field];
    if (value === undefined || value === null) return '';

    const text = String(value);

    if (highlightMatches && result.matches) {
      const fieldMatches = result.matches.filter((m) => m.key === field);
      return highlightText(text, fieldMatches);
    }

    return escapeHtml(text);
  }

  // Handle click outside to close results
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.fuse-search-container')) {
      resultsVisible = false;
      selectedIndex = -1;
    }
  }

  // Cleanup on unmount
  $effect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      if (debounceTimer !== undefined) {
        clearTimeout(debounceTimer);
      }
      document.removeEventListener('click', handleClickOutside);
    };
  });

  // Show results when query changes
  $effect(() => {
    if (searchQuery.trim()) {
      resultsVisible = true;
    }
  });
</script>

<div class="fuse-search-container {className}">
  <div class="fuse-search-input-wrapper">
    <!-- svelte-ignore a11y_autofocus -->
    <input
      bind:this={inputElement}
      bind:value={searchQuery}
      oninput={handleInput}
      onkeydown={handleKeyDown}
      onfocus={() => {
        if (searchQuery.trim() && searchResults.length > 0) {
          resultsVisible = true;
        }
      }}
      type="search"
      {placeholder}
      {autofocus}
      class="fuse-search-input {inputClass}"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={resultsVisible && searchResults.length > 0}
      aria-controls="fuse-search-results"
      aria-activedescendant={selectedIndex >= 0 ? `result-${selectedIndex}` : undefined}
      autocomplete="off"
      spellcheck="false"
    />

    {#if searchQuery}
      <button
        type="button"
        class="fuse-search-clear"
        onclick={() => {
          searchQuery = '';
          debouncedQuery = '';
          resultsVisible = false;
          selectedIndex = -1;
          inputElement?.focus();
        }}
        aria-label="Clear search"
      >
        ×
      </button>
    {/if}
  </div>

  {#if resultsVisible && debouncedQuery && searchResults.length === 0}
    <div class="fuse-search-empty" role="status">
      <p>No results found for "{debouncedQuery}"</p>
    </div>
  {:else if resultsVisible && searchResults.length > 0}
    <ul id="fuse-search-results" class="fuse-search-results {resultsClass}" role="listbox">
      {#each searchResults as result, index (result.refIndex)}
        {@const isSelected = index === selectedIndex}
        <li
          id="result-{index}"
          data-result-index={index}
          class="fuse-search-result-item {resultItemClass} {isSelected ? 'selected' : ''}"
          role="option"
          aria-selected={isSelected}
          onclick={() => selectResult(result)}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectResult(result);
            }
          }}
          onmouseenter={() => {
            if (keyboardNav) selectedIndex = index;
          }}
          tabindex="0"
        >
          <div class="fuse-result-content">
            {#each fields as field, fieldIndex (field)}
              {@const highlightedValue = getHighlightedValue(result, field)}
              {#if highlightedValue}
                <span class="fuse-result-field">
                  <!-- HTML is properly escaped in getHighlightedValue() via escapeHtml() -->
                  {@html highlightedValue}
                </span>
                {#if fieldIndex < fields.length - 1}
                  <span class="fuse-result-separator" aria-hidden="true"> · </span>
                {/if}
              {/if}
            {/each}
          </div>

          {#if showScore && result.score !== undefined}
            <span class="fuse-result-score" aria-label="Match quality">
              {Math.round((1 - result.score) * 100)}%
            </span>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<!--
@component
FuseSearch - A modern, streamlined fuzzy search component

## Features
- 🎯 Result highlighting with matched text emphasis
- ⌨️ Keyboard navigation (arrow keys, enter, escape)
- ⚡ Debounced search for smooth performance
- 🎨 Fully customizable styling
- ♿ Accessible with ARIA support
- 📱 Responsive design

## Usage
```svelte
<script>
  import { FuseSearch } from 'flexilexi';
  
  const products = [
    { name: 'Laptop', brand: 'TechCorp', price: 999 },
    { name: 'Mouse', brand: 'TechCorp', price: 29 }
  ];
</script>

<FuseSearch 
  data={products}
  keys={['name', 'brand']}
  displayFields={['name', 'brand']}
  threshold={0.3}
  onselect={(item) => console.log('Selected:', item)}
/>
```

## Props
@prop data - Array of objects to search
@prop keys - Fields to search in (auto-detected if omitted)
@prop displayFields - Fields to display in results
@prop threshold - Fuzziness (0.0-1.0, default 0.4)
@prop placeholder - Input placeholder text
@prop autofocus - Auto-focus input (default false)
@prop debounce - Debounce delay in ms (default 150)
@prop maxResults - Maximum results to show (default 50)
@prop highlightMatches - Show matched text highlights (default true)
@prop showScore - Show match quality score (default false)
@prop keyboardNav - Enable keyboard navigation (default true)
@prop class - Custom container class
@prop inputClass - Custom input class
@prop resultsClass - Custom results list class
@prop resultItemClass - Custom result item class
@prop onselect - Callback when result is selected
@prop onsearch - Callback when search is performed
-->

<style>
  .fuse-search-container {
    position: relative;
    width: 100%;
  }

  .fuse-search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .fuse-search-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #1f2937;
    background-color: #fff;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    outline: none;
    transition: all 0.15s ease-in-out;
  }

  .fuse-search-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .fuse-search-input::placeholder {
    color: #9ca3af;
  }

  .fuse-search-clear {
    position: absolute;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    font-size: 1.5rem;
    line-height: 1;
    color: #6b7280;
    background: none;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }

  .fuse-search-clear:hover {
    color: #1f2937;
    background-color: #f3f4f6;
  }

  .fuse-search-results {
    position: absolute;
    z-index: 50;
    width: 100%;
    max-height: 24rem;
    margin-top: 0.5rem;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    list-style: none;
    padding: 0;
  }

  .fuse-search-result-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out;
    border-bottom: 1px solid #f3f4f6;
  }

  .fuse-search-result-item:last-child {
    border-bottom: none;
  }

  .fuse-search-result-item:hover,
  .fuse-search-result-item.selected {
    background-color: #f9fafb;
  }

  .fuse-result-content {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .fuse-result-field {
    color: #1f2937;
    font-size: 0.875rem;
  }

  .fuse-result-separator {
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .fuse-result-score {
    margin-left: 0.75rem;
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    background-color: #f3f4f6;
    border-radius: 0.25rem;
  }

  .fuse-search-empty {
    position: absolute;
    z-index: 50;
    width: 100%;
    margin-top: 0.5rem;
    padding: 1.5rem;
    text-align: center;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .fuse-search-empty p {
    margin: 0;
    color: #6b7280;
    font-size: 0.875rem;
  }

  :global(.fuse-highlight) {
    background-color: #fef3c7;
    color: #92400e;
    font-weight: 600;
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .fuse-search-input {
      color: #f9fafb;
      background-color: #1f2937;
      border-color: #374151;
    }

    .fuse-search-input::placeholder {
      color: #6b7280;
    }

    .fuse-search-input:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
    }

    .fuse-search-clear {
      color: #9ca3af;
    }

    .fuse-search-clear:hover {
      color: #f9fafb;
      background-color: #374151;
    }

    .fuse-search-results,
    .fuse-search-empty {
      background-color: #1f2937;
      border-color: #374151;
    }

    .fuse-search-result-item {
      border-bottom-color: #374151;
    }

    .fuse-search-result-item:hover,
    .fuse-search-result-item.selected {
      background-color: #111827;
    }

    .fuse-result-field {
      color: #f9fafb;
    }

    .fuse-result-separator {
      color: #6b7280;
    }

    .fuse-result-score {
      color: #9ca3af;
      background-color: #374151;
    }

    .fuse-search-empty p {
      color: #9ca3af;
    }

    :global(.fuse-highlight) {
      background-color: #451a03;
      color: #fcd34d;
    }
  }
</style>
