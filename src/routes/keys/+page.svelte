<script>
  import dictionary from '../data/japanese-data.json';
  import { FlexiLexi } from '$lib';
  import { P, Heading } from 'flowbite-svelte';
  import SampleDataJ from '../utils/SampleDataJ.svelte';

  let keys = ['romaji', 'english'];
  const codeLine = 'bg-gray-200 px-1 py-0.5 rounded text-sm font-mono text-gray-800';
</script>

<Heading tag="h1" class="mb-3 text-4xl font-bold">Keys Property Example</Heading>
<P class="mb-4 text-xl">
  Control which fields are <strong>searchable</strong> in your data
</P>

<div class="mb-6">
  <Heading tag="h2" class="mb-3 text-2xl font-semibold">What are Keys?</Heading>
  <P class="mb-8 text-lg">
    The <code class={codeLine}>keys</code> prop determines which properties in your data are
    <strong>searched</strong>. When you type in the search box, FlexiLexi only looks through the
    fields specified in <code class={codeLine}>keys</code>.
  </P>

  <Heading tag="h3" class="mb-4 text-lg font-semibold">In this example:</Heading>
  <pre><code>let keys = ['romaji', 'english']</code></pre>
  <P class="mt-2">
    Your search will only match text in the <strong>romaji</strong> and <strong>english</strong>
    fields. Searches won't match text in the <code>japanese</code> field.
  </P>
  <P class="mt-2 text-sm">
    🔍 <strong>Try it:</strong> Type "iku" (romaji) or "go" (english) to find results. Japanese
    characters won't work because <code>japanese</code> is not in the keys array.
  </P>
</div>

<div class="mt-16">
  <FlexiLexi {dictionary} {keys} />
</div>

<SampleDataJ />
