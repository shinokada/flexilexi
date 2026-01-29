<script>
  import data from '../../data/japanese-data.json';
  import { FuzzyHeadless } from '$lib';
  import { Heading, P, Button } from 'flowbite-svelte';
</script>

<Heading tag="h1" class="mb-4 text-4xl font-bold">Headless Fuzzy Examples</Heading>
<P class="mb-8 text-xl">
  Full control over UI using snippets - build completely custom search experiences
</P>

<!-- Example 1: Custom Threshold UI -->
<section class="mb-16">
  <Heading tag="h2" class="mb-4 text-3xl font-semibold">1. Custom Threshold UI</Heading>
  <P class="mb-4">Buttons instead of slider for threshold control</P>

  <FuzzyHeadless {data}>
    {#snippet threshold({ value, onChange })}
      <div class="mb-4">
        <P class="mb-2">Select Fuzziness Level:</P>
        <div class="flex gap-2">
          <Button size="sm" onclick={() => onChange(0.2)} color={value === 0.2 ? 'blue' : 'light'}>
            Strict (0.2)
          </Button>
          <Button size="sm" onclick={() => onChange(0.4)} color={value === 0.4 ? 'blue' : 'light'}>
            Medium (0.4)
          </Button>
          <Button size="sm" onclick={() => onChange(0.6)} color={value === 0.6 ? 'blue' : 'light'}>
            Loose (0.6)
          </Button>
          <Button size="sm" onclick={() => onChange(0.8)} color={value === 0.8 ? 'blue' : 'light'}>
            Very Loose (0.8)
          </Button>
        </div>
      </div>
    {/snippet}
  </FuzzyHeadless>
</section>

<!-- Example 2: Custom Search Input with Icon -->
<section class="mb-16">
  <Heading tag="h2" class="mb-4 text-3xl font-semibold">2. Custom Search Input</Heading>
  <P class="mb-4">Search input with custom styling and icon</P>

  <FuzzyHeadless {data}>
    {#snippet search({ value, onChange, isSearching })}
      <div class="relative mb-4">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          {value}
          oninput={(e) => onChange(e.currentTarget.value)}
          placeholder="Search Japanese words..."
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {#if isSearching}
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <div
              class="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"
            ></div>
          </div>
        {/if}
      </div>
    {/snippet}
  </FuzzyHeadless>
</section>

<!-- Example 3: Custom Results as Cards -->
<section class="mb-16">
  <Heading tag="h2" class="mb-4 text-3xl font-semibold">3. Custom Results Display</Heading>
  <P class="mb-4">Results displayed as cards instead of list</P>

  <FuzzyHeadless {data} fields={['japanese', 'romaji', 'english']}>
    {#snippet results({ results })}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each results as result (result.refIndex)}
          <div
            class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="mb-2 text-xl font-bold text-gray-900">
              {result.item.japanese}
            </div>
            <div class="mb-1 text-sm text-gray-600">
              {result.item.romaji}
            </div>
            <div class="text-sm text-gray-500">
              {result.item.english}
            </div>
            {#if result.score !== undefined}
              <div class="mt-2 text-xs text-blue-600">
                Match: {((1 - result.score) * 100).toFixed(0)}%
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/snippet}
  </FuzzyHeadless>
</section>

<!-- Example 4: Completely Custom UI -->
<section class="mb-16">
  <Heading tag="h2" class="mb-4 text-3xl font-semibold">4. Completely Custom UI</Heading>
  <P class="mb-4">All snippets customized for a unique experience</P>

  <div class="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
    <FuzzyHeadless {data}>
      {#snippet search({ value, onChange })}
        <div class="mb-6">
          <input
            type="search"
            {value}
            oninput={(e) => onChange(e.currentTarget.value)}
            placeholder="🔍 Type anything..."
            class="w-full rounded-full border-2 border-blue-300 bg-white px-6 py-3 text-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
      {/snippet}

      {#snippet results({ results })}
        <div class="space-y-2">
          {#each results as result (result.refIndex)}
            <div
              class="flex cursor-pointer items-center justify-between rounded-lg bg-white p-3 shadow-sm transition-colors hover:bg-blue-100"
            >
              <div>
                <span class="font-semibold text-gray-900">{result.item.japanese}</span>
                <span class="mx-2 text-gray-400">→</span>
                <span class="text-gray-700">{result.item.english}</span>
              </div>
              <div class="text-sm font-medium text-blue-600">
                {((1 - (result.score || 0)) * 100).toFixed(0)}%
              </div>
            </div>
          {/each}
        </div>
      {/snippet}

      {#snippet empty({ query })}
        <div class="py-8 text-center">
          <div class="mb-2 text-4xl">🤔</div>
          <P>No matches for "<strong>{query}</strong>"</P>
          <P class="text-sm text-gray-500">Try a different search term</P>
        </div>
      {/snippet}
    </FuzzyHeadless>
  </div>
</section>
