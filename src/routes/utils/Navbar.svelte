<script>
	import { Navbar, NavLi, NavBrand, NavUl, uiHelpers, Darkmode } from 'svelte-5-ui-lib';
	import { page } from '$app/stores';
	
  let activeUrl = $state($page.url.pathname);
  $effect(() => {
    activeUrl = $page.url.pathname;
  });

	let nav = uiHelpers();

	let navStatus = $state(false);
	let toggleNav = nav.toggle;
	let closeNav = nav.close;

	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		navStatus = nav.isOpen;
	});

	const navClass =
		'w-full divide-gray-200 border-gray-200 bg-white text-gray-500 dark:divide-gray-700 dark:border-gray-700 dark:bg-sky-950 sm:px-4';
	const ulclass =
		'mt-0 flex flex-col py-3 lg:flex-row lg:my-0 order-1 font-medium xl:gap-4 dark:lg:bg-transparent dark:bg-sky-950 lg:bg-white border-0';
</script>

<header
	class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white lg:pl-4 dark:border-gray-600 dark:bg-sky-950"
>
	<Navbar
		{toggleNav}
		{closeNav}
		{navStatus}
		{navClass}
		fluid
		breakPoint="lg"
		div2Class="ml-auto w-full"
	>
		{#snippet brand()}
			<NavBrand siteName="FlexiLexi" {closeNav} />
			<div class="ml-auto flex items-center lg:order-1">
				<Darkmode class="inline-block hover:text-gray-900 dark:hover:text-white" />
			</div>
		{/snippet}
		<NavUl {activeUrl} class={ulclass}>
			<NavLi href="/" {closeNav}>Home</NavLi>
			<NavLi href="/feilds" {closeNav}>Feilds</NavLi>
			<NavLi href="/keys" {closeNav}>Keys</NavLi>
			<NavLi href="/threshold" {closeNav}>Threshold</NavLi>
			<NavLi href="/single-object" {closeNav}>Single object</NavLi>
			<NavLi href="/about" {closeNav}>About</NavLi>
			<NavLi href="https://github.com/shinokada/flexilexi" target="_blank" {closeNav}>GitHub</NavLi>
		</NavUl>
	</Navbar>
</header>
