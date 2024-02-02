<script lang="ts">
	interface DictionaryObject {
		[key: string]: string;
	}
	interface Props {
		dictionary: DictionaryObject[] | DictionaryObject;
		keys?: string[];
		fields?: string[];
		thresholdValue?: number;
		isObject?: boolean;
		divclass?: string;
		autofocus?: boolean;
	}

	let {
		dictionary,
		keys = [],
		fields = [],
		thresholdValue = 0,
		isObject = false,
		divclass,
		autofocus = true,
		...attributes
	} = $props<Props>();

	import Fuse from 'fuse.js';

	let threshold = $state(thresholdValue);

	// If keys are not provided, extract keys dynamically from the dictionary dataset
	if (!keys || keys.length === 0) {
		// Check if the dictionary is an object and extract keys from its first item
		if (Array.isArray(dictionary) && dictionary.length > 0 && typeof dictionary[0] === 'object') {
			keys = Object.keys(dictionary[0]);
		} else {
			// keys = Object.keys(dictionary);
			dictionary = Object.keys(dictionary).map((key) => ({ key, value: dictionary[key] }));
			keys = ['key'];
			fields = ['key', 'value'];
			// console.log('dic: ', dictionary);
		}
	}

	let options = $derived({
		keys,
		threshold
	});

	if (!fields.length) {
		fields = keys;
	}

	let searchInput = $state('');

	let fuse = new Fuse(dictionary, options);

	let searchResults = $state([]);

	function handleSearch() {
		searchResults = fuse.search(searchInput);
	}

	function handleThreshold() {
		fuse = new Fuse(dictionary, options);
		searchResults = fuse.search(searchInput);
	}
</script>

<div class="divclass">
	<label for="minmax-range" class="rangeLabelClass">Fuzziness: {threshold}</label>
	<input
		id="minmax-range"
		type="range"
		min="0"
		max="1"
		step="0.2"
		bind:value={threshold}
		onchange={handleThreshold}
		class="rangeInputClass"
	/>
</div>
<div class="div2class">
	<label for="default-input" class="searchLabelClass">Searching: {searchInput}</label>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		bind:value={searchInput}
		oninput={handleSearch}
		placeholder="Search..."
		class="searchInputClass"
		{autofocus}
	/>
</div>

<ul class="ulclass">
	{#each searchResults as result}
		<li class="liclass">
			{#each fields as field, index}
				{result.item[field]}
				{#if index < fields.length - 1}
					:&nbsp;
				{/if}
			{/each}
		</li>
	{/each}
</ul>
