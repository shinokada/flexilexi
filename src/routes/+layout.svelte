<script lang="ts">
  import '../app.css';
  import { Runatics } from 'runatics';
  import { RunesMetaTags, type MetaProps, deepMerge } from 'runes-meta-tags';
  import { page } from '$app/state';
  // import { Footer } from 'runes-webkit';
  import Footer from "./utils/Footer.svelte";
  import Nav from './utils/Nav.svelte';

  let { children, data } = $props();
  const analyticsId = data.ANALYTICS_ID;

  let metaTags = $state<MetaProps>(page.data.pageMetaTags ? deepMerge<MetaProps>(data.layoutMetaTags, page.data.pageMetaTags) : data.layoutMetaTags);

  $effect(() => {
    metaTags = page.data.pageMetaTags ? deepMerge<MetaProps>(data.layoutMetaTags, page.data.pageMetaTags) : data.layoutMetaTags;
  });

  const lis = [{ name: 'About', href: '/about' }];
  const brand = {
    name: 'codewithshin.com',
    href: 'https://codewithshin.com'
  };
</script>

<Runatics {analyticsId} />
<RunesMetaTags {...metaTags} />
<Nav />
<div class="mx-auto mb-16 max-w-5xl lg:flex">
  <div class="mx-auto max-w-screen-xl px-4 py-8 text-center">
    {@render children()}
  </div>
</div>
<Footer />
