<script>
	import dictionary from '../data/example-data.json';
	import { FlexiLexi } from '$lib';

	let keys = ['japanese', 'english'];
</script>

<h1 class="text-4xl">Keys props example</h1>
<h2 class="text-3xl">You can search Japanese and English.</h2>
<FlexiLexi {dictionary} {keys} />
