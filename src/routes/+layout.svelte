<script>
	import '../app.pcss';
	import Navbar from './utils/Navbar.svelte';
	import Footer from './utils/Footer.svelte';
	let { children } = $props();
</script>

<Navbar />

<section class="border-b border-gray-300 dark:border-gray-500">
	<div class="mx-auto max-w-screen-xl px-4 py-8 text-center">
		{@render children()}
	</div>
</section>

<Footer title="FlexiLexi" />
