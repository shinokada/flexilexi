<script lang="ts">
  import data from '../data/japanese-data.json';
  import { Fuzzy } from '$lib';
  import { Heading, P } from 'flowbite-svelte';
  import type { DataItem } from '$lib';

  function handleSelect(item: DataItem) {
    alert(`Selected: ${JSON.stringify(item, null, 2)}`);
  }
</script>

<Heading tag="h1" class="mb-4 text-4xl font-bold">Fuzzy Examples</Heading>
<P class="mb-8 text-xl">Explore different ways to use the modular Fuzzy component</P>

<!-- Example 1: Default Usage -->
<section class="mb-16">
  <Heading tag="h2" class="mb-4 text-3xl font-semibold">1. Default Usage</Heading>
  <P class="mb-4">All features enabled with default styling</P>
  <Fuzzy {data} />
</section>

<!-- Example 2: With Selection Callback -->
<section class="mb-16">
  <Heading tag="h2" class="mb-4 text-3xl font-semibold">2. With Selection Callback</Heading>
  <P class="mb-4">Click on any result to see the selected item</P>
  <Fuzzy {data} onSelect={handleSelect} />
</section>

<!-- Example 3: Without Threshold Slider -->
<section class="mb-16">
  <Heading tag="h2" class="mb-4 text-3xl font-semibold">3. Without Threshold Slider</Heading>
  <P class="mb-4">Hide the threshold control for simpler UI</P>
  <Fuzzy {data} showThreshold={false} thresholdValue={0.4} />
</section>

<!-- Example 4: Custom Fields -->
<section class="mb-16">
  <Heading tag="h2" class="mb-4 text-3xl font-semibold">4. Custom Fields</Heading>
  <P class="mb-4">Search in all fields but only display specific ones</P>
  <Fuzzy {data} fields={['japanese', 'english']} />
</section>

<!-- Example 5: Custom Styling -->
<section class="mb-16">
  <Heading tag="h2" class="mb-4 text-3xl font-semibold">5. Custom Styling with Tailwind</Heading>
  <P class="mb-4">Using Tailwind classes for custom appearance</P>
  <Fuzzy
    {data}
    searchInputClass="block w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    ulClass="max-w-md list-inside list-disc space-y-1 text-gray-500"
  />
</section>
