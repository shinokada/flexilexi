<script>
	import { removeHyphensAndCapitalize } from 'runes-meta-tags';
	/*eslint no-undef: "off"*/
	const name = __NAME__;
	const version = __VERSION__;
	const githuburl = __GITHUBURL__; 
	const svelteVersion = __SVELTE_VERSION__;
	const svelteKitVersion = __SVELTEKIT_VERSION__;
	const viteVersion = __VITE_VERSION__;
</script>

<div class="mx-auto max-w-4xl p-8 text-left">
	<h1 class="text-3xl">LexiLearn Hub Apps</h1>

	<ul class="list-disc p-4 text-left text-lg dark:text-gray-400">
		<li class="hover:text-red-700 hover:underline">
			<a href="https://gjett-norsk.codewithshin.com/" class="me-4 hover:underline md:me-6"
				>Gjett Norsk</a
			>
		</li>
		<li class="hover:text-red-700 hover:underline">
			<a
				href="https://multilanguage-flashcard.codewithshin.com/"
				class="me-4 hover:underline md:me-6">Multilanguage flashcard</a
			>
		</li>
		<li class="hover:text-red-700 hover:underline">
			<a href="https://norske-flashcard.codewithshin.com/" class="me-4 hover:underline md:me-6"
				>Norske flashcard</a
			>
		</li>
		<li class="hover:text-red-700 hover:underline">
			<a href="https://nihongo-flashcard.codewithshin.com/" class="me-4 hover:underline md:me-6"
				>Japanese flashcard</a
			>
		</li>
		<li class="hover:text-red-700 hover:underline">
			<a href="https://flexilexi-dictionary.codewithshin.com/" class="me-4 hover:underline md:me-6"
				>Fexilexi dictionary (English/Norwegian/Japanese)</a
			>
		</li>
	</ul>

	<h2 class="my-2 text-2xl">Technical info</h2>
	<ul class="list-disc p-4 text-left text-lg dark:text-gray-400">
		<li class="hover:text-red-700 hover:underline">
			<a
				href="https://flexilexi.codewithshin.com/"
				class="me-4 hover:underline md:me-6">{removeHyphensAndCapitalize(name)} : {version}</a
			>
		</li>
		<li class="hover:text-red-700 hover:underline">
			<a
				href="https://svelte.dev/"
				class="me-4 hover:underline md:me-6">Svelte: {svelteVersion}</a
			>
		</li>
		<li>
			<a href="https://kit.svelte.dev/docs/introduction" class="me-4 hover:underline md:me-6"
				>SvelteKit: {svelteKitVersion}</a
			>
		</li>
		<li class="hover:text-red-700 hover:underline">
			<a href="https://vitejs.dev/" class="hover:underline">Vite: {viteVersion}</a>
		</li>
	</ul>

	<h2 class="my-2 text-2xl">Repo</h2>
	<ul class="list-disc p-4 text-left text-lg dark:text-gray-400">
		<li class="hover:text-red-700 hover:underline">
			<a href={githuburl} class="me-4 hover:underline md:me-6">Github repo</a>
		</li>
		<li class="hover:text-red-700 hover:underline">
			<a href="https://codewithshin.com" class="me-4 hover:underline md:me-6"
				>Author: codewithshin.com</a
			>
		</li>
	</ul>
</div>
