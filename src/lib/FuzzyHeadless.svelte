<script lang="ts">
  import { useFuzzySearch } from './useFuzzySearch.svelte';
  import type { FuzzySearchOptions, DataItem } from './useFuzzySearch.svelte';
  import type { Snippet } from 'svelte';
  import type { FuseResult } from 'fuse.js';

  interface Props extends FuzzySearchOptions {
    /** Fields to display in results (defaults to keys) */
    fields?: string[];
    /** Slot for custom threshold control */
    threshold?: Snippet<[{ value: number; onChange: (value: number) => void }]>;
    /** Slot for custom search input */
    search?: Snippet<[{ value: string; onChange: (value: string) => void; isSearching: boolean }]>;
    /** Slot for custom results display */
    results?: Snippet<
      [
        {
          results: FuseResult<DataItem>[];
          fields: string[];
          query: string;
        }
      ]
    >;
    /** Slot for empty state */
    empty?: Snippet<[{ query: string }]>;
  }

  let {
    data,
    keys = [],
    fields = [],
    thresholdValue = 0.6,
    debounceMs = 300,
    threshold,
    search,
    results: resultsSlot,
    empty
  }: Props = $props();

  // Use the composable for search logic with reactive props
  const fuzzySearch = $derived(
    useFuzzySearch({
      data,
      keys,
      thresholdValue,
      debounceMs
    })
  );

  // Display fields (defaults to searchKeys)
  const displayFields = $derived(fields.length > 0 ? fields : fuzzySearch.searchKeys);

  // Helper to get display value
  function getDisplayValue(item: DataItem, field: string): string {
    const value = item[field];
    if (value === undefined || value === null) {
      return '';
    }
    return String(value);
  }
</script>

<!-- Threshold Control -->
{#if threshold}
  {@render threshold({
    value: fuzzySearch.threshold,
    onChange: fuzzySearch.setThreshold
  })}
{:else}
  <div class="fuzzy-threshold">
    <label for="fuzzy-threshold-input">
      Fuzziness: {fuzzySearch.threshold.toFixed(1)}
    </label>
    <input
      id="fuzzy-threshold-input"
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={fuzzySearch.threshold}
      oninput={(e) => fuzzySearch.setThreshold(Number(e.currentTarget.value))}
      aria-label="Adjust search fuzziness"
    />
  </div>
{/if}

<!-- Search Input -->
{#if search}
  {@render search({
    value: fuzzySearch.searchQuery,
    onChange: fuzzySearch.setSearchQuery,
    isSearching: fuzzySearch.isSearching
  })}
{:else}
  <div class="fuzzy-search">
    <label for="fuzzy-search-input">
      {#if fuzzySearch.searchQuery}
        Searching for: "{fuzzySearch.searchQuery}"
      {:else}
        Search
      {/if}
    </label>
    <input
      id="fuzzy-search-input"
      type="search"
      value={fuzzySearch.searchQuery}
      oninput={(e) => fuzzySearch.setSearchQuery(e.currentTarget.value)}
      placeholder="Type to search..."
      aria-label="Search input"
      autocomplete="off"
    />
  </div>
{/if}

<!-- Results or Empty State -->
{#if fuzzySearch.debouncedQuery && fuzzySearch.results.length === 0}
  {#if empty}
    {@render empty({ query: fuzzySearch.debouncedQuery })}
  {:else}
    <div class="fuzzy-empty">
      <p>No results found for "{fuzzySearch.debouncedQuery}"</p>
    </div>
  {/if}
{:else if fuzzySearch.results.length > 0}
  {#if resultsSlot}
    {@render resultsSlot({
      results: fuzzySearch.results,
      fields: displayFields,
      query: fuzzySearch.debouncedQuery
    })}
  {:else}
    <ul class="fuzzy-results">
      {#each fuzzySearch.results as result (result.refIndex)}
        <li class="fuzzy-result-item">
          {#each displayFields as field, index (field)}
            {@const value = getDisplayValue(result.item, field)}
            {#if value}
              <span class="field-value">{value}</span>
              {#if index < displayFields.length - 1}
                <span class="separator">: </span>
              {/if}
            {/if}
          {/each}
          {#if result.score !== undefined}
            <span class="match-score">
              (Score: {(1 - result.score).toFixed(2)})
            </span>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
{/if}

<!--
@component
Fuzzy - Flexible fuzzy search component with customizable UI

## Usage

### Basic (with default UI)
```svelte
<Fuzzy data={myData} />
```

### Custom threshold slider
```svelte
<Fuzzy data={myData}>
  {#snippet threshold({ value, onChange })}
    <input type="range" {value} oninput={(e) => onChange(Number(e.target.value))} />
  {/snippet}
</Fuzzy>
```

### Fully custom
```svelte
<Fuzzy data={myData}>
  {#snippet search({ value, onChange })}
    <MyCustomInput {value} {onChange} />
  {/snippet}
  
  {#snippet results({ results, fields })}
    <MyCustomResults {results} {fields} />
  {/snippet}
{/Fuzzy}
```
-->

<style>
  .fuzzy-threshold {
    margin: 1rem 0;
  }

  .fuzzy-threshold label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .fuzzy-threshold input[type='range'] {
    width: 100%;
    max-width: 300px;
  }

  .fuzzy-search {
    margin: 1rem 0;
  }

  .fuzzy-search label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .fuzzy-search input {
    width: 100%;
    max-width: 400px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .fuzzy-empty {
    padding: 1rem;
    text-align: center;
    color: #666;
    font-style: italic;
  }

  .fuzzy-results {
    list-style: disc;
    padding-left: 2rem;
    margin: 1rem 0;
  }

  .fuzzy-result-item {
    margin: 0.5rem 0;
  }

  .match-score {
    margin-left: 0.5rem;
    font-size: 0.875rem;
    color: #888;
  }

  .separator {
    color: #999;
  }
</style>
