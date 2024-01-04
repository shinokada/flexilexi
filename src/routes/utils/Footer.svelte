<script>
  let { title } = $props()
</script>

<footer class="dark:bg-gray-900 m-4 mt-16 border-t">
  <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div class="sm:flex sm:items-center sm:justify-between">
        <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse z-10">
      
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{title}</span>
        </a>
        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 z-10">
          <li>
              <a href="https://svelte-5-preview.vercel.app/docs/introduction" target="_blank" class="text-md hover:underline me-4 md:me-6">Svelte 5</a>
          </li>
          <li>
            <a href="https://kit.svelte.dev/docs/introduction" target="_blank" class="text-md hover:underline me-4 md:me-6">SvelteKit 2</a>
          </li>
          <li>
            <a href="https://github.com/krisk/fuse" target="_blank" class="text-md hover:underline me-4 md:me-6">Fuse.js</a>
          </li>
          <li>
            <a href="https://vitejs.dev/"  class="text-md hover:underline me-4 md:me-6">Vite 5</a>
          </li>
        </ul>
    </div>
  </div>
</footer>