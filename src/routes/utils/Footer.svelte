<script lang='ts'>
	import { Footer, FooterBrand, FooterLi, FooterUl } from 'svelte-5-ui-lib';

	const version = __VERSION__
	const svelte5uilibVersion = __SVELTE5UILIBVERSION__
	const svelteVersion = __SVELTEVERSION__
	const svelteKitVersion = __SVELTEKITVERSION__
	const viteVersion = __VITEVERSION__
	const fuseVersion = __FUSEVERSION__
</script>

<Footer footerclass="shadow-none dark:bg-sky-950" footerType="logo">
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterBrand href="/" name="LexiLearn Hub" />
		<FooterUl
			ulclass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 px-4"
		>
		<FooterLi href="https://github.com/shinokada/flexilexi" target="_blank"
				>Flexilexi: {version}</FooterLi
			>
			<FooterLi href="https://svelte-5-ui-lib.vercel.app/" target="_blank"
				>Svelte 5 UI Lib: {svelte5uilibVersion}</FooterLi
			>
			<FooterLi href="https://svelte-5-preview.vercel.app/docs/introduction" target="_blank"
				>Svelte: {svelteVersion}</FooterLi
			>
			<FooterLi href="https://kit.svelte.dev/docs/introduction" target="_blank"
				>SvelteKit: {svelteKitVersion}</FooterLi
			>
			<FooterLi href="https://github.com/krisk/fuse" target="_blank">Fuse: {fuseVersion}</FooterLi>
			<FooterLi href="https://vitejs.dev/" target="_blank">Vite: {viteVersion}</FooterLi>
		</FooterUl>
	</div>
</Footer>
