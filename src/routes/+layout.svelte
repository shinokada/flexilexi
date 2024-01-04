<script>
	import '../app.pcss';
  import Navbar from './utils/Navbar.svelte'
	let { children } = $props();
</script>

<Navbar />

<section class="dark:bg-gray-900">
  <div class="pt-8 px-4 mx-auto max-w-screen-xl text-center">
    {@render children()}
  </div>
</section>
