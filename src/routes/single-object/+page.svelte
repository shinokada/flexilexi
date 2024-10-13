<script>
	import dictionary from '../data/english-data.json';
	import { FlexiLexi } from '$lib';
</script>

<h1 class="text-4xl">Single Object data set</h1>

<FlexiLexi {dictionary} />

<h2 class="mb-4 mt-8 text-2xl">Sample data</h2>
<pre class="overflow-x-auto whitespace-pre-wrap text-left dark:text-white">
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

<style>
	pre {
		background-color: #f4f4f4;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 1em;
		margin: 1em;
		text-align: left;
	}

	code {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.9em;
		display: block;
		text-align: left;
	}

	/* For dark mode */
	:global(.dark) pre {
		background-color: #2d2d2d;
		border-color: #444;
	}
</style>
