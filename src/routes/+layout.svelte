<script>
	import '../app.pcss';
	import { Runatics } from 'runatics';
	// import Analytics from './utils/Analytics.svelte';
	import { RunesMetaTags, deepMerge } from 'runes-meta-tags';
  import { page } from '$app/stores';
	let { children, data } = $props();
	import Navbar from './utils/Navbar.svelte';
	import Footer from './utils/Footer.svelte';
	let metaTags = $state(
    $page.data.pageMetaTags
      ? deepMerge($page.data.layoutMetaTags, $page.data.pageMetaTags)
      : data.layoutMetaTags
  );
  $effect(() => {
    metaTags = $page.data.pageMetaTags ? deepMerge($page.data.layoutMetaTags, $page.data.pageMetaTags ) : data.layoutMetaTags
  });
	const analyticsId = data.ANALYTICS_ID
</script>

<Runatics {analyticsId} />
<RunesMetaTags {...metaTags}/>

<Navbar />

<section class="min-h-screen border-b border-gray-300 dark:border-gray-500">
	<div class="mx-auto max-w-screen-xl px-4 py-8 text-center">
		{@render children()}
	</div>
</section>

<Footer />
