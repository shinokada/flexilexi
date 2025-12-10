<script>
  import dictionary from './data/japanese-data.json';
  import { FlexiLexi } from '$lib';
  import { P, Heading } from 'flowbite-svelte';
  import SampleDataJ from './utils/SampleDataJ.svelte';
</script>

<Heading tag="h1" class="mb-4 text-5xl font-bold">FlexiLexi</Heading>
<P class="mb-2 text-xl">A powerful Svelte 5 component for fuzzy search with real-time results</P>
<P class="mb-6 text-lg">
  Built with Fuse.js • Adjustable search sensitivity • Optimized performance
</P>

<div class="my-8">
  <Heading tag="h2" class="mb-3 text-3xl font-semibold">Try it out: Japanese Dictionary</Heading>
  <P class="mb-4 text-lg ">Search in Japanese, Romaji, or English</P>
</div>

<div class="mt-16">
  <FlexiLexi {dictionary} />
</div>

<SampleDataJ />
