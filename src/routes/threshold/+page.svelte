<script>
  import data from '../data/japanese-data.json';
  import { FlexiLexi } from '$lib';
  import { P, Heading, List, Li } from 'flowbite-svelte';
  import SampleDataJ from '../utils/SampleDataJ.svelte';
  const codeLine = 'bg-gray-200 px-1 py-0.5 rounded text-sm font-mono text-gray-800';
</script>

<Heading tag="h1" class="mb-3 text-4xl font-bold">Threshold Property Example</Heading>
<P class="mb-4 text-xl text-gray-600">
  Set the initial <strong>fuzziness level</strong> for search matching
</P>

<div class="mb-6">
  <Heading class="mb-3 text-2xl font-semibold">What is Threshold?</Heading>
  <P class="mb-3 text-lg">
    The <code class={codeLine}>thresholdValue</code> prop controls how "fuzzy" the search is. It's a
    number between <strong>0.0</strong> (exact matches only) and <strong>1.0</strong> (very loose matching).
  </P>

  <Heading tag="h3" class="my-4 text-lg font-semibold">In this example:</Heading>
  <pre><code>thresholdValue={0.6}</code></pre>
  <P class="my-4">
    The search starts with moderate fuzziness (0.6), allowing for typos and partial matches.
  </P>

  <Heading tag="h4" class="my-4 font-semibold">Threshold Guide:</Heading>
  <List class="list-inside list-disc space-y-1 ">
    <Li><strong>0.0 - 0.2:</strong> Strict matching, minimal typos allowed</Li>
    <Li><strong>0.3 - 0.5:</strong> Moderate fuzziness, some flexibility</Li>
    <Li><strong>0.6 - 0.8:</strong> Loose matching, forgiving of mistakes</Li>
    <Li><strong>0.9 - 1.0:</strong> Very loose, matches almost anything</Li>
  </List>

  <P class="my-4 text-sm">
    🎯 <strong>Try it:</strong> Use the fuzziness slider to see how different thresholds affect your results.
    Lower values give more precise results, higher values cast a wider net.
  </P>
</div>

<div class="mt-16">
  <FlexiLexi {data} thresholdValue={0.6} />
</div>

<SampleDataJ />
