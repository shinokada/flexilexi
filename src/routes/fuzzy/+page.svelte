<script>
  import FuzzyExampleWrapper from './FuzzyExampleWrapper.svelte';
  import { P, Heading, List, Li } from 'flowbite-svelte';
  import SampleDataJ from '../utils/SampleDataJ.svelte';
  const codeLine = 'bg-gray-200 px-1 py-0.5 rounded text-sm font-mono text-gray-800';
</script>

<main>
  <header>
    <Heading tag="h1" class="mb-3 text-4xl font-bold">Fuzzy Component</Heading>
    <P class="mb-4 text-xl">Explore different configuration options for fuzzy search</P>
  </header>

  <!-- Fields Section -->
  <section class="mt-8 mb-16">
    <Heading tag="h2" class="mb-4 text-3xl font-semibold">Fields Property</Heading>
    <P class="mb-4 text-xl">
      Control which fields are <strong>displayed</strong> in search results
    </P>

    <article class="mb-6">
      <Heading tag="h3" class="mb-3 text-2xl font-semibold">What are Fields?</Heading>
      <P class="mb-3 text-lg">
        The <code class={codeLine}>fields</code> prop determines which properties from your data are
        <strong>shown</strong> in the results list. This is different from
        <code class={codeLine}>keys</code> which controls what you search <em>in</em>.
      </P>

      <Heading tag="h4" class="mb-3 text-lg font-semibold">In this example:</Heading>
      <pre class="mb-3"><code>let fields = ['japanese', 'english']</code></pre>
      <P class="mb-2">
        Even though the data contains <code class={codeLine}>japanese</code>,
        <code class={codeLine}>romaji</code>, and <code class={codeLine}>english</code>, only
        <strong>japanese and english</strong> will be displayed in the results.
      </P>
      <P class="mb-4 text-sm">
        💡 <strong>Tip:</strong> You can still search through all fields, but you'll only see the
        ones specified in <code class={codeLine}>fields</code>.
      </P>
    </article>

    <article class="mt-8 p-4">
      <FuzzyExampleWrapper name="field" />
    </article>
  </section>

  <!-- Keys Section -->
  <div class="mb-16">
    <Heading tag="h2" class="mb-4 text-3xl font-semibold">Keys Property</Heading>
    <P class="mb-4 text-xl">
      Control which fields are <strong>searchable</strong> in your data
    </P>

    <div class="mb-6">
      <Heading tag="h3" class="mb-3 text-2xl font-semibold">What are Keys?</Heading>
      <P class="mb-3 text-lg">
        The <code class={codeLine}>keys</code> prop determines which properties in your data are
        <strong>searched</strong>. When you type in the search box, FuzzySearch only looks through
        the fields specified in <code class={codeLine}>keys</code>.
      </P>

      <Heading tag="h4" class="mb-3 text-lg font-semibold">In this example:</Heading>
      <pre class="mb-3"><code>let keys = ['romaji', 'english']</code></pre>
      <P class="mb-2">
        Your search will only match text in the <strong>romaji</strong> and <strong>english</strong>
        fields. Searches won't match text in the <code class={codeLine}>japanese</code> field.
      </P>
      <P class="mb-4 text-sm">
        🔍 <strong>Try it:</strong> Type "iku" (romaji) or "go" (english) to find results. Japanese
        characters won't work because <code class={codeLine}>japanese</code> is not in the keys array.
      </P>
    </div>

    <div class="mt-8">
      <FuzzyExampleWrapper name="keys" />
    </div>
  </div>

  <!-- Threshold Section -->
  <div class="mb-16">
    <Heading tag="h2" class="mb-4 text-3xl font-semibold">Threshold Property</Heading>
    <P class="mb-4 text-xl">
      Set the initial <strong>fuzziness level</strong> for search matching
    </P>

    <div class="mb-6">
      <Heading tag="h3" class="mb-3 text-2xl font-semibold">What is Threshold?</Heading>
      <P class="mb-3 text-lg">
        The <code class={codeLine}>thresholdValue</code> prop controls how "fuzzy" the search is.
        It's a number between <strong>0.0</strong> (exact matches only) and <strong>1.0</strong>
        (very loose matching).
      </P>

      <Heading tag="h4" class="mb-3 text-lg font-semibold">In this example:</Heading>
      <pre class="mb-3"><code>thresholdValue={0.6}</code></pre>
      <P class="mb-3">
        The search starts with moderate fuzziness (0.6), allowing for typos and partial matches.
      </P>

      <Heading tag="h4" class="mb-3 font-semibold">Threshold Guide:</Heading>
      <List class="mb-3 list-inside list-disc space-y-1">
        <Li><strong>0.0 - 0.2:</strong> Strict matching, minimal typos allowed</Li>
        <Li><strong>0.3 - 0.5:</strong> Moderate fuzziness, some flexibility</Li>
        <Li><strong>0.6 - 0.8:</strong> Loose matching, forgiving of mistakes</Li>
        <Li><strong>0.9 - 1.0:</strong> Very loose, matches almost anything</Li>
      </List>

      <P class="mb-4 text-sm">
        🎯 <strong>Try it:</strong> Use the fuzziness slider to see how different thresholds affect your
        results. Lower values give more precise results, higher values cast a wider net.
      </P>
    </div>

    <div class="mt-8">
      <FuzzyExampleWrapper name="threshold" />
    </div>
  </div>

  <div class="mb-16">
    <Heading tag="h2" class="mb-4 text-3xl font-semibold">Modular</Heading>

    <P
      >modular, flexible architecture lets you build search experiences exactly the way you want.
      Choose your level of customization:</P
    >

    <Heading tag="h4" class="mb-3 text-lg font-semibold">Headless Component</Heading>

    <Heading tag="h4" class="mb-3 text-lg font-semibold">Composable</Heading>
    <div class="mt-8">
      <FuzzyExampleWrapper name="composable" />
    </div>

    <Heading tag="h4" class="mb-3 text-lg font-semibold">useFuzzySearch</Heading>

    <div class="mt-8">
      <FuzzyExampleWrapper name="useFuzzySearch" />
    </div>

    <Heading tag="h4" class="mb-3 text-lg font-semibold">Advanced</Heading>

    <div class="mt-8">
      <FuzzyExampleWrapper name="advanced" />
    </div>
  </div>

  <!-- Single Object Section -->
  <div class="mb-16">
    <Heading tag="h2" class="mb-4 text-3xl font-semibold">Single Object Data</Heading>
    <P class="mb-4 text-xl">
      FuzzySearch works with <strong>object dictionaries</strong>, not just arrays
    </P>

    <div class="mb-6">
      <Heading tag="h3" class="mb-3 text-2xl font-semibold">What is a Single Object?</Heading>
      <P class="mb-3 text-lg">
        Instead of an array of objects, you can pass a single object where keys map to values.
        FuzzySearch automatically converts it into a searchable format.
      </P>

      <Heading tag="h4" class="mb-3 text-lg font-semibold">Perfect for:</Heading>
      <List class="mb-3 list-inside list-disc space-y-1">
        <Li><strong>Dictionaries:</strong> Word definitions, glossaries</Li>
        <Li><strong>Translations:</strong> Key-value translation pairs</Li>
        <Li><strong>Configuration:</strong> Settings and their descriptions</Li>
        <Li><strong>Simple lookups:</strong> Any key-to-value mapping</Li>
      </List>

      <P class="mb-4">
        <strong>Format:</strong> FuzzySearch converts
        <code class={codeLine}>{"{'key': 'value'}"}</code>
        into
        <code class={codeLine}>[{"{'key': '...', 'value': '...'}"}, ...]</code> automatically.
      </P>
    </div>

    <div class="mt-8">
      <FuzzyExampleWrapper name="singleObject" />
    </div>

    <Heading tag="h3" class="mt-8 mb-4 text-2xl font-semibold">Sample data</Heading>
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
  </div>

  <SampleDataJ />
</main>
