<script>
	import dictionary from '../data/japanese-data.json';
	import { FlexiLexi } from '$lib';
	import SampleDataJ from '../utils/SampleDataJ.svelte';

	let fields = ['japanese', 'english'];
</script>

<h1 class="text-4xl">Feilds props example</h1>
<h2 class="text-3xl">You can select fields. For example, searching Japanese and English.</h2>
<pre><code>let fields = ['japanese', 'english']</code></pre>
<FlexiLexi {dictionary} {fields} />

<SampleDataJ />