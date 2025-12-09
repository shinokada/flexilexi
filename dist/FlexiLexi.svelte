<script lang="ts">
  import type { FuseResult } from 'fuse.js';
  import Fuse from 'fuse.js';

  // Type Definitions
  type DictionaryItem = Record<string, string | number | boolean>;

  interface Props {
    /** Array of objects or single object to search through */
    dictionary: DictionaryItem[] | DictionaryItem;
    /** Fields to search in (defaults to all keys in first dictionary item) */
    keys?: string[];
    /** Fields to display in results (defaults to keys) */
    fields?: string[];
    /** Initial fuzziness threshold (0.0 = exact, 1.0 = match anything) */
    thresholdValue?: number;
    /** Enable autofocus on search input */
    autofocus?: boolean;
    /** Debounce delay for search in milliseconds */
    debounceMs?: number;
    /** Custom CSS classes */
    divClass?: string;
    rangeLabelClass?: string;
    rangeInputClass?: string;
    div2Class?: string;
    searchLabelClass?: string;
    searchInputClass?: string;
    ulClass?: string;
    liClass?: string;
  }

  let {
    dictionary = [],
    keys = [],
    fields = [],
    thresholdValue = 0.6,
    autofocus = true,
    debounceMs = 300,
    divClass = 'divclass',
    rangeLabelClass = 'rangeLabelClass',
    rangeInputClass = 'rangeInputClass',
    div2Class = 'div2class',
    searchLabelClass = 'searchLabelClass',
    searchInputClass = 'searchInputClass',
    ulClass = 'ulclass',
    liClass = 'liclass'
  }: Props = $props();

  // State
  let threshold = $derived(thresholdValue);
  let searchInput = $state('');
  let debouncedSearchInput = $state('');
  let debounceTimer: number | undefined = $state();

  // Normalize dictionary to array format
  const dictionaryArray = $derived.by(() => {
    if (Array.isArray(dictionary)) {
      return dictionary as DictionaryItem[];
    } else if (typeof dictionary === 'object' && dictionary !== null) {
      // Convert object to array of {key, value} pairs
      return Object.entries(dictionary).map(([key, value]) => ({
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

    // Extract from first item in dictionary
    if (dictionaryArray.length > 0) {
      return Object.keys(dictionaryArray[0]);
    }

    // Fallback for object dictionaries
    return ['key', 'value'];
  });

  // Fields to display (defaults to searchKeys)
  const displayFields = $derived(fields.length > 0 ? fields : searchKeys);

  // Validate that displayFields is a subset of searchKeys
  $effect(() => {
    const invalidFields = displayFields.filter((field) => !searchKeys.includes(field));
    if (invalidFields.length > 0) {
      console.warn(
        `FlexiLexi: Display fields ${invalidFields.join(', ')} are not in search keys. They will be ignored.`
      );
    }
  });

  // Fuse.js configuration
  const fuseOptions = $derived({
    keys: searchKeys,
    threshold,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 1,
    // Optimize for performance
    shouldSort: true,
    // Adjust for better fuzzy matching
    location: 0,
    distance: 100
  });

  // Create Fuse instance
  const fuse = $derived(new Fuse(dictionaryArray, fuseOptions));

  // Search results
  const searchResults = $derived.by((): FuseResult<DictionaryItem>[] => {
    if (!debouncedSearchInput.trim()) {
      return [];
    }
    return fuse.search(debouncedSearchInput);
  });

  // Debounced search handler
  function handleSearchInput() {
    if (debounceTimer !== undefined) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = window.setTimeout(() => {
      debouncedSearchInput = searchInput;
    }, debounceMs);
  }

  // Cleanup on unmount
  $effect(() => {
    return () => {
      if (debounceTimer !== undefined) {
        clearTimeout(debounceTimer);
      }
    };
  });

  // Format display value
  function getDisplayValue(item: DictionaryItem, field: string): string {
    const value = item[field];
    if (value === undefined || value === null) {
      return '';
    }
    return String(value);
  }
</script>

<div class={divClass}>
  <label for="minmax-range" class={rangeLabelClass}>
    Fuzziness: {threshold.toFixed(1)}
  </label>
  <input
    id="minmax-range"
    type="range"
    min="0"
    max="1"
    step="0.1"
    bind:value={threshold}
    class={rangeInputClass}
    aria-label="Adjust search fuzziness"
    aria-valuemin={0}
    aria-valuemax={1}
    aria-valuenow={threshold}
    aria-valuetext={`Fuzziness level ${threshold.toFixed(1)}`}
  />
</div>

<div class={div2Class}>
  <label for="search-input" class={searchLabelClass}>
    {#if searchInput}
      Searching for: "{searchInput}"
    {:else}
      Search
    {/if}
  </label>
  <!-- svelte-ignore a11y_autofocus -->
  <input
    id="search-input"
    type="search"
    bind:value={searchInput}
    oninput={handleSearchInput}
    placeholder="Type to search..."
    class={searchInputClass}
    {autofocus}
    aria-label="Search input"
    autocomplete="off"
    spellcheck="false"
  />
</div>

{#if searchInput && searchResults.length === 0}
  <div class="empty-state" role="status">
    <p>No results found for "{searchInput}"</p>
  </div>
{:else if searchResults.length > 0}
  <ul class={ulClass} role="list">
    {#each searchResults as result (result.refIndex)}
      <li class={liClass} role="listitem">
        {#each displayFields as field, index (field)}
          {@const value = getDisplayValue(result.item, field)}
          {#if value}
            <span class="field-value">
              {value}
            </span>
            {#if index < displayFields.length - 1}
              <span class="separator" aria-hidden="true">:&nbsp;</span>
            {/if}
          {/if}
        {/each}
        {#if result.score !== undefined}
          <span class="match-score" aria-label="Match quality">
            (Score: {(1 - result.score).toFixed(2)})
          </span>
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<!--
@component
FlexiLexi - A flexible fuzzy search component powered by Fuse.js

## Features
- 🔍 Fuzzy search with adjustable threshold
- ⚡ Debounced input for better performance  
- ♿ Accessible with proper ARIA labels
- 🎨 Customizable styling with class props
- 📊 Shows match quality scores
- 🔄 Reactive updates as you type

## Usage
```svelte
<script>
  import { FlexiLexi } from 'flexilexi';
  
  const data = [
    { name: 'Apple', category: 'Fruit' },
    { name: 'Banana', category: 'Fruit' },
    { name: 'Carrot', category: 'Vegetable' }
  ];
</script>

<FlexiLexi 
  dictionary={data}
  keys={['name', 'category']}
  fields={['name']}
  thresholdValue={0.3}
/>
```

## Props
@prop dictionary - Data to search (array or object)
@prop keys - Fields to search in (auto-detected if omitted)
@prop fields - Fields to display (defaults to keys)
@prop thresholdValue - Initial fuzziness (0.0-1.0, default 0.6)
@prop autofocus - Auto-focus search input (default true)
@prop debounceMs - Search debounce delay (default 300ms)
@prop divClass - Container class for threshold control
@prop rangeLabelClass - Label class for threshold
@prop rangeInputClass - Input class for threshold slider
@prop div2Class - Container class for search input
@prop searchLabelClass - Label class for search
@prop searchInputClass - Input class for search
@prop ulClass - Results list container class
@prop liClass - Individual result item class
-->

<style>
  .empty-state {
    padding: 1rem;
    text-align: center;
    color: #666;
    font-style: italic;
  }

  .match-score {
    margin-left: 0.5rem;
    font-size: 0.875rem;
    color: #888;
    font-weight: 500;
  }

  .separator {
    color: #999;
  }

  .field-value {
    display: inline-block;
  }
</style>
