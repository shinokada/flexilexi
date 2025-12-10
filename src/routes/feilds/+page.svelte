<script>
  import dictionary from '../data/japanese-data.json';
  import { FlexiLexi } from '$lib';
  import { P, Heading } from 'flowbite-svelte';
  import SampleDataJ from '../utils/SampleDataJ.svelte';

  let fields = ['japanese', 'english'];
  const codeLine = 'bg-gray-200 px-1 py-0.5 rounded text-sm font-mono text-gray-800';
</script>

<Heading tag="h1" class="mb-3 text-4xl font-bold">Fields Property Example</Heading>
<P class="mb-4 text-xl">
  Control which fields are <strong>displayed</strong> in search results
</P>

<div class="mb-6">
  <Heading tag="h2" class="my-4 text-2xl font-semibold">What are Fields?</Heading>
  <P class="mb-3 text-lg">
    The <code class={codeLine}>fields</code> prop determines which properties from your data are
    <strong>shown</strong>
    in the results list. This is different from <code class={codeLine}>keys</code> which controls
    what you search <em>in</em>.
  </P>

  <Heading tag="h3" class="my-4 text-lg font-semibold">In this example:</Heading>
  <pre><code>let fields = ['japanese', 'english']</code></pre>
  <P class=" mt-2">
    Even though the data contains <code class={codeLine}>japanese</code>,
    <code class={codeLine}>romaji</code>, and <code class={codeLine}>english</code>, only
    <strong>japanese and english</strong> will be displayed in the results.
  </P>
  <P class="mt-2 text-sm">
    💡 <strong>Tip:</strong> You can still search through all fields, but you'll only see the ones
    specified in <code class={codeLine}>fields</code>.
  </P>
</div>

<div class="mt-16">
  <FlexiLexi {dictionary} {fields} />
</div>

<SampleDataJ />
