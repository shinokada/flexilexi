<script>
	import dictionary from '../data/japanese-data.json';
	import { FlexiLexi } from '$lib';
	import SampleDataJ from '../utils/SampleDataJ.svelte';
</script>

<h1 class="text-4xl">Threshold example</h1>
<h2 class="text-3xl">You can search Japanese, Romaji, and English.</h2>
<FlexiLexi {dictionary} thresholdValue={0.6} />


<SampleDataJ />