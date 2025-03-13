<script lang="ts">
	import { Footer, FooterBrand, FooterLi, FooterUl } from 'svelte-5-ui-lib';
	/*eslint no-undef: "off"*/
	const version = __VERSION__;
	const svelte5uilibVersion = __SVELTE_5_UI_LIB_VERSION__;
	const svelteVersion = __SVELTE_VERSION__;
	const svelteKitVersion = __SVELTEKIT_VERSION__;
	const viteVersion = __VITE_VERSION__;
	const fuseVersion = __FUSEVERSION__;
</script>

<Footer class="shadow-none dark:bg-sky-950" footerType="logo">
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterBrand href="/" name="LexiLearn Hub" />
		<FooterUl
			class="mt-3 flex flex-wrap items-center px-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
		>
			<FooterLi href="https://github.com/shinokada/flexilexi" target="_blank"
				>Flexilexi: {version}</FooterLi
			>
			<FooterLi href="https://preview.svelte-5-ui-lib.com/" target="_blank"
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
