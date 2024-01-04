<script>
	let { title } = $props();
</script>

<footer class="m-4 mt-16 border-t dark:bg-gray-900">
	<div class="mx-auto w-full max-w-screen-xl p-4 md:py-8">
		<div class="sm:flex sm:items-center sm:justify-between">
			<a href="/" class="z-10 mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse">
				<span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
					>{title}</span
				>
			</a>
			<ul
				class="z-10 mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
			>
				<li>
					<a
						href="https://svelte-5-preview.vercel.app/docs/introduction"
						target="_blank"
						class="text-md me-4 hover:underline md:me-6">Svelte 5</a
					>
				</li>
				<li>
					<a
						href="https://kit.svelte.dev/docs/introduction"
						target="_blank"
						class="text-md me-4 hover:underline md:me-6">SvelteKit 2</a
					>
				</li>
				<li>
					<a
						href="https://github.com/krisk/fuse"
						target="_blank"
						class="text-md me-4 hover:underline md:me-6">Fuse.js</a
					>
				</li>
				<li>
					<a href="https://vitejs.dev/" class="text-md me-4 hover:underline md:me-6">Vite 5</a>
				</li>
			</ul>
		</div>
	</div>
</footer>
