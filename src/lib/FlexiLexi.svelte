<script lang="ts">
	import type { FuseResult } from 'fuse.js';
	interface DictionaryObject {
		[key: string]: string;
	}
	interface Props {
		dictionary: DictionaryObject[] | DictionaryObject;
		keys?: string[];
		fields?: string[];
		thresholdValue?: number;
		isObject?: boolean;
		autofocus?: boolean;
	}

	let {
		dictionary = [],
		keys = [],
		fields = [],
		thresholdValue = 0,
		isObject = false,
		autofocus = true,
		...attributes
	}: Props = $props();

	import Fuse from 'fuse.js';

	let threshold = $state(thresholdValue);
	let dictionaryArray: DictionaryObject[];

	// If keys are not provided, extract keys dynamically from the dictionary dataset
	if (!keys || keys.length === 0) {
		// Check if the dictionary is an object and extract keys from its first item
		if (Array.isArray(dictionary)) {
			dictionaryArray = dictionary;
			if (dictionary.length > 0 && typeof dictionary[0] === 'object') {
				keys = Object.keys(dictionary[0]);
			}
		} else if (typeof dictionary === 'object') {
			// Handle the case where dictionary is a single object
			dictionaryArray = Object.keys(dictionary).map((key) => ({
				key,
				value: (dictionary as DictionaryObject)[key]
			}));
			keys = ['key'];
			fields = ['key', 'value'];
		} else {
			dictionaryArray = [];
		}
	} else {
		dictionaryArray = Array.isArray(dictionary) ? dictionary : [dictionary];
	}

	let options = $derived({
		keys,
		threshold
	});

	if (!fields.length) {
		fields = keys;
	}

	let searchInput = $state('');

	let fuse = $derived(new Fuse(dictionaryArray, options));

	let searchResults = $state<FuseResult<DictionaryObject>[]>([]);

	function handleSearch() {
		searchResults = fuse.search(searchInput);
	}

	function handleThreshold() {
		// fuse = new Fuse(dictionaryArray, options);
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
	<!-- svelte-ignore a11y_autofocus -->
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

<!--
@component
[Go to docs](https://flexilexi.codewithshin.com/)
## Props
@prop dictionary = []
@prop keys = []
@prop fields = []
@prop thresholdValue = 0
@prop isObject = false
@prop autofocus = true
@prop ...attributes
-->
