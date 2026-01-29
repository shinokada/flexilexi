<script lang="ts">
  import { useFuzzySearch } from 'flexilexi';
  import data from '../../data/japanese-data.json';

  const search = useFuzzySearch({
    data,
    keys: ['japanese', 'romaji', 'english'],
    thresholdValue: 0.6,
    debounceMs: 300
  });

  // Create a local binding for the input
  let searchValue = $state('');

  function handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchValue = target.value;
    search.setSearchQuery(searchValue);
  }

  function handleThresholdChange(event: Event) {
    const target = event.target as HTMLInputElement;
    search.setThreshold(Number(target.value));
  }
</script>

<div class="mx-auto max-w-4xl p-6">
  <h1 class="mb-6 text-3xl font-bold">Fuzzy Search Example</h1>

  <div class="mb-6 space-y-4">
    <div>
      <label for="search" class="mb-2 block text-sm font-medium">
        Search (Japanese, romaji, or English):
      </label>
      <input
        id="search"
        type="text"
        value={searchValue}
        oninput={handleSearchInput}
        placeholder="Try: go, iku, 行く, home, ie..."
        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="threshold" class="mb-2 block text-sm font-medium">
        Threshold: {search.threshold.toFixed(2)}
      </label>
      <input
        id="threshold"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={search.threshold}
        oninput={handleThresholdChange}
        class="w-full"
      />
      <p class="mt-1 text-xs text-gray-600">Lower values = more results (less strict matching)</p>
    </div>
  </div>

  <div>
    <h2 class="mb-4 text-xl font-semibold">
      Results ({search.results.length})
    </h2>

    {#if search.results.length > 0}
      <div class="grid gap-3">
        {#each search.results as result, i (i)}
          <div class="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-2xl font-bold text-gray-900">{result.item.japanese}</p>
                <p class="text-lg text-gray-600">{result.item.romaji}</p>
                <p class="text-gray-700">{result.item.english}</p>
              </div>
              <div class="text-right">
                <span
                  class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                >
                  Score: {(1 - (result.score ?? 0)).toFixed(3)}
                </span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else if search.searchQuery}
      <p class="text-gray-500 italic">No results found. Try adjusting the threshold.</p>
    {:else}
      <p class="text-gray-500 italic">Start typing to search...</p>
    {/if}
  </div>
</div>
