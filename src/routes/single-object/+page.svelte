<script>
  import data from '../data/english-data.json';
  import { FlexiLexi } from '$lib';
  import { P, Heading, List, Li } from 'flowbite-svelte';
  const codeLine = 'bg-gray-200 px-1 py-0.5 rounded text-sm font-mono text-gray-800';
</script>

<Heading tag="h1" class="my-8 text-4xl font-bold">Single Object Data Example</Heading>
<P class="my-4 text-xl">
  FlexiLexi works with <strong>object dictionaries</strong>, not just arrays
</P>

<div class="my-8">
  <Heading tag="h2" class="my-4 text-2xl font-semibold">What is a Single Object?</Heading>
  <P class="mb-3 text-lg">
    Instead of an array of objects, you can pass a single object where keys map to values. FlexiLexi
    automatically converts it into a searchable format.
  </P>

  <Heading tag="h3" class="my-4 text-lg font-semibold">Perfect for:</Heading>
  <List class="mb-3 list-inside list-disc space-y-1 ">
    <Li><strong>Dictionaries:</strong> Word definitions, glossaries</Li>
    <Li><strong>Translations:</strong> Key-value translation pairs</Li>
    <Li><strong>Configuration:</strong> Settings and their descriptions</Li>
    <Li><strong>Simple lookups:</strong> Any key-to-value mapping</Li>
  </List>

  <P>
    <strong>Format:</strong> FlexiLexi converts
    <code class={codeLine}>{"{'key': 'value'}"}</code>
    into
    <code class={codeLine}>[{"{'key': '...', 'value': '...'}"}, ...]</code> automatically.
  </P>
</div>

<div class="mt-16">
  <FlexiLexi {data} />
</div>

<Heading tag="h2" class="mt-8 mb-4 text-2xl">Sample data</Heading>
<pre class="overflow-x-auto text-left whitespace-pre-wrap dark:text-white">
  <code>
{`{
  "abacus": "A counting device that uses beads on rods to perform arithmetic operations.",
  "amiable": "Having or displaying a friendly and pleasant manner.",
  "altruistic": "Showing a selfless concern for the well-being of others.",
  "benevolent": "Well-meaning and kindly."
	...
}`}
  </code>
</pre>
