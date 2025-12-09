<script lang="ts">
  import '../app.css';
  import { Runatics } from 'runatics';
  import { MetaTags, type MetaProps, deepMerge } from 'runes-meta-tags';
  import { page } from '$app/state';
  // import { Footer } from 'runes-webkit';
  import Footer from './utils/Footer.svelte';
  import Nav from './utils/Nav.svelte';

  let { children, data } = $props();
  const analyticsId = $derived(data.ANALYTICS_ID);

  let metaTags = $derived<MetaProps>(
    page.data.pageMetaTags
      ? deepMerge<MetaProps>(data.layoutMetaTags, page.data.pageMetaTags)
      : data.layoutMetaTags
  );

  $effect(() => {
    metaTags = page.data.pageMetaTags
      ? deepMerge<MetaProps>(data.layoutMetaTags, page.data.pageMetaTags)
      : data.layoutMetaTags;
  });
</script>

<Runatics {analyticsId} />
<MetaTags {...metaTags} />
<Nav />
<div class="mx-auto mb-16 max-w-5xl lg:flex">
  <div class="mx-auto max-w-screen-xl px-4 py-8 text-center">
    {@render children()}
  </div>
</div>
<Footer />
