<script lang="ts">
  import data from '../../data/japanese-data.json';
  import { useFuzzySearch, SearchInput, SearchResults } from '$lib';
  const search = useFuzzySearch({ data, thresholdValue: 0.4 });
</script>

<div class="p-4">
  <SearchInput value={search.searchQuery} onChange={search.setSearchQuery} />
  <SearchResults results={search.results} />
</div>
