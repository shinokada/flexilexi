<script>
	import { removeHyphensAndCapitalize } from 'runes-meta-tags';
	/*eslint no-undef: "off"*/
	const name = __NAME__;
	const version = __VERSION__;
	const githuburl = __GITHUBURL__;
	const flowbitesvelte = __FLOWBITE_SVELTE_VERSION__;
	const svelteVersion = __SVELTE_VERSION__;
	const svelteKitVersion = __SVELTEKIT_VERSION__;
	const viteVersion = __VITE_VERSION__;
</script>

<div class="mx-auto max-w-4xl p-8 text-left">
	<h1 class="text-3xl">About</h1>
	<p>Fuzzy dictionary.</p>

	<h2 class="my-8 text-2xl">LexiLearn Hub Apps</h2>

	<ul class="m-4 list-disc p-4 text-left text-lg dark:text-gray-400">
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

	<h2>Technical info</h2>
	<ul class="m-4 list-disc p-4 text-left text-lg dark:text-gray-400">
		<li class="hover:text-red-700 hover:underline">
			<a
				href="https://svelte-5-preview.codewithshin.com/docs/introduction"
				class="me-4 hover:underline md:me-6">{removeHyphensAndCapitalize(name)} : {version}</a
			>
		</li>
		<li class="hover:text-red-700 hover:underline">
			<a
				href="https://svelte-5-preview.codewithshin.com/docs/introduction"
				class="me-4 hover:underline md:me-6">Svelte 5: {svelteVersion}</a
			>
		</li>
		<li>
			<a href="https://prefiew.flowbite-svelte.com/" class="me-4 hover:underline md:me-6"
				>Flowbite Svelte: {flowbitesvelte}</a
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

	<h2 class="m-4 text-left text-2xl font-bold dark:text-white">Repo</h2>
	<ul class="m-4 list-disc p-4 text-left text-lg dark:text-gray-400">
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
