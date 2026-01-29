<script lang="ts">
  import data from '../../data/japanese-data.json';
  import { useFuzzySearch, ThresholdSlider, SearchInput, SearchResults } from '$lib';
  import type { DataItem } from '$lib';
  import { Heading, P, Card, Badge } from 'flowbite-svelte';

  // Use the composable directly for maximum control
  const search = useFuzzySearch({
    data,
    thresholdValue: 0.4,
    debounceMs: 200
  });

  // Custom state for additional features
  // Using Record type for flexible data structure from JSON
  let selectedItem = $state<Record<string, string | number | boolean> | null>(null);
  let searchHistory = $state<string[]>([]);

  function handleSearch(query: string) {
    search.setSearchQuery(query);
    if (query && !searchHistory.includes(query)) {
      searchHistory = [...searchHistory, query].slice(-5); // Keep last 5
    }
  }

  function handleSelect(item: DataItem) {
    selectedItem = item as Record<string, string | number | boolean>;
  }

  function useHistoryTerm(term: string) {
    search.setSearchQuery(term);
  }
</script>

<Heading tag="h1" class="mb-4 text-4xl font-bold">Using the Composable</Heading>
<P class="mb-8 text-xl">
  Build completely custom search experiences using <code>useFuzzySearch</code>
</P>

<div class="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
  <!-- Left: Search Controls -->
  <div class="lg:col-span-2">
    <Card>
      <Heading tag="h2" class="mb-4 text-2xl font-semibold">Search</Heading>

      <!-- Custom threshold display -->
      <div class="mb-4">
        <ThresholdSlider
          value={search.threshold}
          onChange={search.setThreshold}
          label="Search Sensitivity"
        />
        <div class="mt-2 flex gap-2">
          <Badge color="blue" onclick={() => search.setThreshold(0.2)}>Exact</Badge>
          <Badge color="indigo" onclick={() => search.setThreshold(0.4)}>Strict</Badge>
          <Badge color="purple" onclick={() => search.setThreshold(0.6)}>Moderate</Badge>
          <Badge color="pink" onclick={() => search.setThreshold(0.8)}>Fuzzy</Badge>
        </div>
      </div>

      <!-- Search input -->
      <SearchInput
        value={search.searchQuery}
        onChange={handleSearch}
        placeholder="Search Japanese dictionary..."
        autofocus={true}
        isSearching={search.isSearching}
      />

      <!-- Search history -->
      {#if searchHistory.length > 0}
        <div class="mt-4">
          <P class="mb-2 text-sm font-medium">Recent searches:</P>
          <div class="flex flex-wrap gap-2">
            {#each searchHistory as term (term)}
              <Badge color="gray" onclick={() => useHistoryTerm(term)}>
                {term}
              </Badge>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Results -->
      <div class="mt-6">
        {#if search.debouncedQuery && search.results.length === 0}
          <div class="rounded-lg bg-yellow-50 p-4 text-center">
            <P>No results for "{search.debouncedQuery}"</P>
          </div>
        {:else if search.results.length > 0}
          <div class="mb-2 text-sm text-gray-500">
            Found {search.results.length} results
          </div>
          <SearchResults
            results={search.results}
            fields={['japanese', 'romaji', 'english']}
            showScore={true}
            onSelect={handleSelect}
          />
        {/if}
      </div>
    </Card>
  </div>

  <!-- Right: Selected Item Details -->
  <div>
    <Card>
      <Heading tag="h3" class="mb-4 text-xl font-semibold">Selected Item</Heading>
      {#if selectedItem}
        <div class="space-y-3">
          <div>
            <div class="mb-1 text-sm font-medium text-gray-500">Japanese</div>
            <div class="text-2xl font-bold">{String(selectedItem.japanese || '')}</div>
          </div>
          <div>
            <div class="mb-1 text-sm font-medium text-gray-500">Romaji</div>
            <div class="text-lg">{String(selectedItem.romaji || '')}</div>
          </div>
          <div>
            <div class="mb-1 text-sm font-medium text-gray-500">English</div>
            <div class="text-lg">{String(selectedItem.english || '')}</div>
          </div>
        </div>
      {:else}
        <P class="text-center text-gray-400">Click on a result to see details</P>
      {/if}
    </Card>

    <!-- Stats Card -->
    <Card class="mt-4">
      <Heading tag="h3" class="mb-4 text-xl font-semibold">Search Stats</Heading>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">Total items:</span>
          <span class="font-medium">{search.dataArray.length}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Search fields:</span>
          <span class="font-medium">{search.searchKeys.length}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Threshold:</span>
          <span class="font-medium">{search.threshold.toFixed(2)}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Results:</span>
          <span class="font-medium">{search.results.length}</span>
        </div>
      </div>
    </Card>
  </div>
</div>

<style>
  code {
    border-radius: 0.25rem;
    background-color: #f3f4f6;
    padding: 0.375rem 0.5rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
  }
</style>
