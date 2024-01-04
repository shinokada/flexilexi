<script>
	import '../app.pcss';
	import Navbar from './utils/Navbar.svelte';
	import Footer from './utils/Footer.svelte';
	let { children } = $props();
</script>

<Navbar />

<section class="dark:bg-gray-900">
	<div class="mx-auto max-w-screen-xl px-4 pt-8 text-center">
		{@render children()}
	</div>
</section>

<Footer title="FlexiLexi" />
