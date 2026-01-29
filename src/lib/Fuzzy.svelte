<script lang="ts">
  import { useFuzzySearch } from './useFuzzySearch.svelte';
  import type { FuzzySearchOptions, DataItem } from './useFuzzySearch.svelte';
  import ThresholdSlider from './components/ThresholdSlider.svelte';
  import SearchInput from './components/SearchInput.svelte';
  import SearchResults from './components/SearchResults.svelte';

  interface Props extends FuzzySearchOptions {
    /** Fields to display in results (defaults to keys) */
    fields?: string[];
    /** Enable autofocus on search input */
    autofocus?: boolean;
    /** Show match scores in results */
    showScore?: boolean;
    /** Show threshold slider */
    showThreshold?: boolean;
    /** Callback when result is selected */
    onSelect?: (item: DataItem) => void;
    /** Custom CSS classes for backward compatibility */
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
    data,
    keys = [],
    fields = [],
    thresholdValue = 0.6,
    debounceMs = 300,
    autofocus = false,
    showScore = true,
    showThreshold = true,
    onSelect,
    divClass = '',
    rangeLabelClass = '',
    rangeInputClass = '',
    div2Class = '',
    searchLabelClass = '',
    searchInputClass = '',
    ulClass = '',
    liClass = ''
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
</script>

<!-- Threshold Control -->
{#if showThreshold}
  <div class={divClass || 'fuzzy-threshold-wrapper'}>
    <ThresholdSlider
      value={fuzzySearch.threshold}
      onChange={fuzzySearch.setThreshold}
      labelClass={rangeLabelClass}
      inputClass={rangeInputClass}
    />
  </div>
{/if}

<!-- Search Input -->
<div class={div2Class || 'fuzzy-search-wrapper'}>
  <SearchInput
    value={fuzzySearch.searchQuery}
    onChange={fuzzySearch.setSearchQuery}
    {autofocus}
    isSearching={fuzzySearch.isSearching}
    labelClass={searchLabelClass}
    inputClass={searchInputClass}
  />
</div>

<!-- Results or Empty State -->
{#if fuzzySearch.debouncedQuery && fuzzySearch.results.length === 0}
  <div class="fuzzy-empty">
    <p>No results found for "{fuzzySearch.debouncedQuery}"</p>
  </div>
{:else if fuzzySearch.results.length > 0}
  <SearchResults
    results={fuzzySearch.results}
    fields={displayFields}
    {showScore}
    {onSelect}
    class={ulClass}
    itemClass={liClass}
  />
{/if}

<!--
@component
Fuzzy - Full-featured fuzzy search component with default UI

## Features
- 🔍 Fuzzy search with adjustable threshold
- ⚡ Debounced input for performance
- ♿ Accessible with ARIA labels
- 🎨 Customizable styling
- 📊 Match quality scores

## Usage

### Basic
```svelte
<Fuzzy data={myData} />
```

### With custom styling
```svelte
<Fuzzy 
  data={myData}
  searchInputClass="my-custom-input"
  ulClass="my-custom-results"
/>
```

### With selection callback
```svelte
<Fuzzy 
  data={myData}
  onSelect={(item) => console.log('Selected:', item)}
/>
```

## Props
@prop data - Data to search (array or object)
@prop keys - Fields to search in (auto-detected if omitted)
@prop fields - Fields to display (defaults to keys)
@prop thresholdValue - Initial fuzziness (0.0-1.0, default 0.6)
@prop debounceMs - Search debounce delay (default 300ms)
@prop autofocus - Auto-focus search input
@prop showScore - Show match scores (default true)
@prop showThreshold - Show threshold slider (default true)
@prop onSelect - Callback when result is selected
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
  .fuzzy-threshold-wrapper,
  .fuzzy-search-wrapper {
    margin: 1rem 0;
  }

  .fuzzy-empty {
    padding: 1rem;
    text-align: center;
    color: #666;
    font-style: italic;
  }
</style>
