<script lang="ts">
  import { useFuzzySearch, type DataItem } from 'flexilexi';
  import data from '../../data/japanese-data.json';

  const search = useFuzzySearch({
    data,
    keys: ['japanese', 'romaji', 'english'],
    thresholdValue: 0.5
  });

  // Add custom logic
  let selectedItem = $state<DataItem | null>(null);
  let favorites = $state<DataItem[]>([]);
  let searchValue = $state('');

  function selectItem(item: DataItem) {
    selectedItem = item;
  }

  function toggleFavorite(item: DataItem) {
    if (favorites.some((f) => f.japanese === item.japanese)) {
      favorites = favorites.filter((f) => f.japanese !== item.japanese);
    } else {
      favorites = [...favorites, item];
    }
  }

  function isFavorite(item: DataItem) {
    return favorites.some((f) => f.japanese === item.japanese);
  }

  function handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchValue = target.value;
    search.setSearchQuery(searchValue);
  }

  // Computed values
  const hasResults = $derived(search.results.length > 0);
  const resultCount = $derived(search.results.length);
</script>

<div class="mx-auto max-w-6xl p-6">
  <h1 class="mb-6 text-3xl font-bold">Advanced Fuzzy Search Example</h1>

  <div class="grid gap-6 lg:grid-cols-3">
    <!-- Search and Results Panel -->
    <div class="lg:col-span-2">
      <div class="mb-4">
        <input
          value={searchValue}
          oninput={handleSearchInput}
          placeholder="Search Japanese, romaji, or English..."
          class="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
        <div class="mt-2 text-sm text-gray-600">
          Found {resultCount}
          {resultCount === 1 ? 'result' : 'results'}
        </div>
      </div>

      {#if hasResults}
        <div class="space-y-2">
          {#each search.results as result, i (i)}
            <div
              class="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-md"
              class:ring-2={selectedItem?.japanese === result.item.japanese}
              class:ring-blue-500={selectedItem?.japanese === result.item.japanese}
            >
              <button onclick={() => selectItem(result.item)} class="flex-1 text-left">
                <div class="text-xl font-bold text-gray-900">{result.item.japanese}</div>
                <div class="text-base text-gray-600">{result.item.romaji}</div>
                <div class="text-sm text-gray-500">{result.item.english}</div>
              </button>

              <div class="ml-4 flex items-center gap-3">
                <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  {(1 - (result.score ?? 0)).toFixed(2)}
                </span>
                <button
                  onclick={() => toggleFavorite(result.item)}
                  class="text-2xl transition-transform hover:scale-110"
                  aria-label={isFavorite(result.item)
                    ? 'Remove from favorites'
                    : 'Add to favorites'}
                >
                  {isFavorite(result.item) ? '★' : '☆'}
                </button>
              </div>
            </div>
          {/each}
        </div>
      {:else if searchValue}
        <div
          class="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center text-gray-500"
        >
          No results found for "{searchValue}"
        </div>
      {:else}
        <div
          class="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center text-gray-500"
        >
          Start typing to search...
        </div>
      {/if}
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Selected Item Panel -->
      {#if selectedItem}
        <div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h2 class="mb-3 text-lg font-semibold text-blue-900">Selected Item</h2>
          <div class="space-y-2">
            <div>
              <span class="text-xs font-medium text-blue-700 uppercase">Japanese</span>
              <div class="text-2xl font-bold text-blue-900">{selectedItem.japanese}</div>
            </div>
            <div>
              <span class="text-xs font-medium text-blue-700 uppercase">Romaji</span>
              <div class="text-lg text-blue-800">{selectedItem.romaji}</div>
            </div>
            <div>
              <span class="text-xs font-medium text-blue-700 uppercase">English</span>
              <div class="text-blue-800">{selectedItem.english}</div>
            </div>
          </div>
        </div>
      {:else}
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-gray-500">
          Click on a result to see details
        </div>
      {/if}

      <!-- Favorites Panel -->
      <div class="rounded-lg border border-gray-200 bg-white p-4">
        <h2 class="mb-3 text-lg font-semibold text-gray-900">
          Favorites ({favorites.length})
        </h2>
        {#if favorites.length > 0}
          <div class="space-y-2">
            {#each favorites as fav, i (i)}
              <div
                class="flex items-center justify-between rounded border border-gray-200 bg-gray-50 p-3"
              >
                <div class="flex-1">
                  <div class="font-bold text-gray-900">{fav.japanese}</div>
                  <div class="text-sm text-gray-600">{fav.romaji}</div>
                </div>
                <button
                  onclick={() => toggleFavorite(fav)}
                  class="text-xl text-yellow-500 transition-transform hover:scale-110"
                  aria-label="Remove from favorites"
                >
                  ★
                </button>
              </div>
            {/each}
          </div>
        {:else}
          <p class="text-center text-sm text-gray-500">No favorites yet</p>
        {/if}
      </div>
    </div>
  </div>
</div>
