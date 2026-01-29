# Modular Architecture Guide

## Overview

FlexiLexi now offers a **modular, flexible architecture** that lets you build search experiences exactly the way you want. Choose your level of customization:

1. **`<Fuzzy>`** - Full-featured component with default UI (easiest)
2. **`<FuzzyHeadless>`** - Component with snippet slots for custom UI
3. **`useFuzzySearch()`** - Composable for complete control (most flexible)
4. **Individual UI Components** - Mix and match pre-built pieces

## Table of Contents

- [Quick Start](#quick-start)
- [The Composable: useFuzzySearch](#the-composable-usefuzzysearch)
- [The Components](#the-components)
- [UI Building Blocks](#ui-building-blocks)
- [Examples](#examples)

---

## Quick Start

### Option 1: Use the Full Component (Easiest)

```svelte
<script>
  import { Fuzzy } from 'flexilexi';
  const data = [
    /* your data */
  ];
</script>

<Fuzzy {data} />
```

### Option 2: Use Headless Component (Custom UI)

```svelte
<script>
  import { FuzzyHeadless } from 'flexilexi';
</script>

<FuzzyHeadless {data}>
  {#snippet search({ value, onChange })}
    <input {value} oninput={(e) => onChange(e.target.value)} />
  {/snippet}

  {#snippet results({ results })}
    {#each results as result}
      <div>{result.item.name}</div>
    {/each}
  {/snippet}
</FuzzyHeadless>
```

### Option 3: Use the Composable (Maximum Control)

```svelte
<script>
  import { useFuzzySearch, SearchInput, SearchResults } from 'flexilexi';

  const search = useFuzzySearch({ data, thresholdValue: 0.4 });
</script>

<SearchInput value={search.searchQuery} onChange={search.setSearchQuery} />

<SearchResults results={search.results} />
```

---

## The Composable: `useFuzzySearch`

The heart of the modular system. Returns reactive state and methods for building search UIs.

### Basic Usage

```svelte
<script>
  import { useFuzzySearch } from 'flexilexi';

  const search = useFuzzySearch({
    data: myData,
    keys: ['name', 'description'],
    thresholdValue: 0.6,
    debounceMs: 300
  });

  // Access reactive state
  const query = search.searchQuery;
  const results = search.results;
  const threshold = search.threshold;

  // Call methods
  search.setSearchQuery('hello');
  search.setThreshold(0.4);
</script>
```

### API

**Options:**

- `data` - Array or object to search
- `keys` - Fields to search in (auto-detected if omitted)
- `thresholdValue` - Initial fuzziness (0.0-1.0, default 0.6)
- `debounceMs` - Debounce delay (default 300ms)

**Returns:**

- `searchQuery` - Current query string
- `setSearchQuery(query)` - Update query
- `threshold` - Current threshold value
- `setThreshold(value)` - Update threshold
- `debouncedQuery` - Debounced query
- `results` - Array of Fuse.js results
- `dataArray` - Normalized data
- `searchKeys` - Detected/provided keys
- `isSearching` - Is currently debouncing

### Advanced Example

```svelte
<script>
  import { useFuzzySearch } from 'flexilexi';

  const search = useFuzzySearch({ data, thresholdValue: 0.5 });

  // Add custom logic
  let selectedItem = $state(null);
  let favorites = $state([]);

  function selectItem(item) {
    selectedItem = item;
  }

  function toggleFavorite(item) {
    if (favorites.includes(item)) {
      favorites = favorites.filter((i) => i !== item);
    } else {
      favorites = [...favorites, item];
    }
  }

  // Computed values
  const hasResults = $derived(search.results.length > 0);
  const resultCount = $derived(search.results.length);
</script>

<!-- Build your completely custom UI -->
<input value={search.searchQuery} oninput={(e) => search.setSearchQuery(e.target.value)} />

<div>Found {resultCount} results</div>

{#each search.results as result}
  <div onclick={() => selectItem(result.item)}>
    {result.item.name}
    <button onclick={() => toggleFavorite(result.item)}>
      {favorites.includes(result.item) ? '★' : '☆'}
    </button>
  </div>
{/each}

{#if selectedItem}
  <div>Selected: {JSON.stringify(selectedItem)}</div>
{/if}
```

---

## The Components

### `<Fuzzy>` - Full Component

Ready-to-use component with all features enabled.

```svelte
<Fuzzy
  {data}
  keys={['name', 'description']}
  fields={['name']}
  thresholdValue={0.4}
  showThreshold={true}
  showScore={true}
  autofocus={true}
  onSelect={(item) => console.log(item)}
  searchInputClass="my-custom-class"
  ulClass="my-results-class"
/>
```

**Props:**

- All `useFuzzySearch` options
- `fields` - Fields to display (defaults to `keys`)
- `autofocus` - Auto-focus search input
- `showScore` - Show match scores
- `showThreshold` - Show threshold slider
- `onSelect` - Callback when result clicked
- Custom class props for styling

### `<FuzzyHeadless>` - Headless Component

Full control over UI using Svelte 5 snippets.

```svelte
<FuzzyHeadless {data} thresholdValue={0.4}>
  <!-- Custom threshold control -->
  {#snippet threshold({ value, onChange })}
    <div>
      <button onclick={() => onChange(0.2)}>Strict</button>
      <button onclick={() => onChange(0.6)}>Loose</button>
      <span>Current: {value}</span>
    </div>
  {/snippet}

  <!-- Custom search input -->
  {#snippet search({ value, onChange, isSearching })}
    <input {value} oninput={(e) => onChange(e.target.value)} placeholder="Search..." />
    {#if isSearching}
      <span>Searching...</span>
    {/if}
  {/snippet}

  <!-- Custom results display -->
  {#snippet results({ results, fields, query })}
    <div class="grid">
      {#each results as result}
        <div class="card">
          {result.item.name}
        </div>
      {/each}
    </div>
  {/snippet}

  <!-- Custom empty state -->
  {#snippet empty({ query })}
    <div>No results for "{query}"</div>
  {/snippet}
</FuzzyHeadless>
```

**Snippet Props:**

**threshold:**

- `value` - Current threshold
- `onChange` - Update function

**search:**

- `value` - Current query
- `onChange` - Update function
- `isSearching` - Is debouncing

**results:**

- `results` - Array of results
- `fields` - Display fields
- `query` - Current query

**empty:**

- `query` - Query with no results

---

## UI Building Blocks

Pre-built components you can use with the composable.

### `<ThresholdSlider>`

```svelte
<script>
  import { useFuzzySearch, ThresholdSlider } from 'flexilexi';

  const search = useFuzzySearch({ data });
</script>

<ThresholdSlider
  value={search.threshold}
  onChange={search.setThreshold}
  min={0}
  max={1}
  step={0.1}
  label="Fuzziness"
  showValue={true}
  class="my-slider"
  labelClass="my-label"
  inputClass="my-input"
/>
```

### `<SearchInput>`

```svelte
<script>
  import { useFuzzySearch, SearchInput } from 'flexilexi';

  const search = useFuzzySearch({ data });
</script>

<SearchInput
  value={search.searchQuery}
  onChange={search.setSearchQuery}
  placeholder="Type to search..."
  label="Search"
  showLabel={true}
  autofocus={true}
  isSearching={search.isSearching}
  class="my-wrapper"
  labelClass="my-label"
  inputClass="my-input"
/>
```

### `<SearchResults>`

```svelte
<script>
  import { useFuzzySearch, SearchResults } from 'flexilexi';

  const search = useFuzzySearch({ data });
</script>

<SearchResults
  results={search.results}
  fields={['name', 'description']}
  showScore={true}
  onSelect={(item) => console.log(item)}
  class="my-results"
  itemClass="my-item"
/>
```

---

## Examples

### Example 1: Search with Side Panel

```svelte
<script>
  import { useFuzzySearch, SearchInput, SearchResults } from 'flexilexi';

  const search = useFuzzySearch({ data });
  let selected = $state(null);
</script>

<div class="grid grid-cols-2">
  <div>
    <SearchInput value={search.searchQuery} onChange={search.setSearchQuery} />
    <SearchResults results={search.results} onSelect={(item) => (selected = item)} />
  </div>

  <div>
    {#if selected}
      <h2>{selected.name}</h2>
      <p>{selected.description}</p>
    {:else}
      <p>Select an item</p>
    {/if}
  </div>
</div>
```

### Example 2: Search with Filters

```svelte
<script>
  import { useFuzzySearch } from 'flexilexi';

  const search = useFuzzySearch({ data });
  let categoryFilter = $state('all');

  const filteredResults = $derived(
    categoryFilter === 'all'
      ? search.results
      : search.results.filter((r) => r.item.category === categoryFilter)
  );
</script>

<input value={search.searchQuery} oninput={(e) => search.setSearchQuery(e.target.value)} />

<select bind:value={categoryFilter}>
  <option value="all">All</option>
  <option value="fruit">Fruit</option>
  <option value="vegetable">Vegetable</option>
</select>

{#each filteredResults as result}
  <div>{result.item.name} - {result.item.category}</div>
{/each}
```

### Example 3: Card Grid with Custom Results

```svelte
<script>
  import { FuzzyHeadless } from 'flexilexi';
</script>

<FuzzyHeadless {data}>
  {#snippet results({ results })}
    <div class="grid grid-cols-3 gap-4">
      {#each results as result}
        <div class="card">
          <img src={result.item.image} alt={result.item.name} />
          <h3>{result.item.name}</h3>
          <p>{result.item.price}</p>
        </div>
      {/each}
    </div>
  {/snippet}
</FuzzyHeadless>
```

---

## Benefits of This Architecture

✅ **Progressive Enhancement** - Start simple, add complexity as needed
✅ **Type-Safe** - Full TypeScript support
✅ **Composable** - Mix and match components
✅ **Testable** - Logic separated from UI
✅ **Flexible** - Build any UI you can imagine
✅ **Backward Compatible** - Old API still works

---

## Migration Guide

If you're using the old monolithic `Fuzzy` component, it still works! But here's how to migrate:

### Before (Still Works)

```svelte
<Fuzzy {data} searchInputClass="my-class" />
```

### After (More Flexible)

```svelte
<!-- Option 2: Use composable -->
<script>
  import { useFuzzySearch, SearchInput } from 'flexilexi';
  const search = useFuzzySearch({ data });
</script>

<!-- Option 1: Same as before -->
<Fuzzy {data} searchInputClass="my-class" />

<SearchInput value={search.searchQuery} onChange={search.setSearchQuery} inputClass="my-class" />
```

---

## Live Examples

Visit [/examples](/examples) to see:

- Basic usage examples
- Headless component demos
- Composable patterns
- Custom UI implementations
