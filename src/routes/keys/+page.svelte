<script>
  import dictionary from '../data/japanese-data.json';
  import { FlexiLexi } from '$lib';
  import SampleDataJ from '../utils/SampleDataJ.svelte';

  let keys = ['romaji', 'english'];
</script>

<h1 class="text-4xl">Keys props example</h1>
<h2 class="text-3xl">You can search Japanese and English.</h2>
<pre><code>let keys = ['romaji', 'english']</code></pre>
<FlexiLexi {dictionary} {keys} />

<SampleDataJ />
