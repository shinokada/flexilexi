<script>
	import { Navbar, NavLi, NavBrand, NavUl, uiHelpers, Darkmode } from 'svelte-5-ui-lib';

	let nav = uiHelpers();

	let navStatus = $state(false);
	let toggleNav = nav.toggle;
	let closeNav = nav.close;

	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		navStatus = nav.isOpen;
	});
	let divClass = "ml-auto w-full"
    let ulClass =
    'flex flex-col py-3 lg:flex-row lg:my-0 order-1 font-medium gap-4 lg:gap-2 dark:lg:bg-transparent lg:bg-white border-0';
    let navClass = 'w-full divide-gray-200 border-gray-200 bg-white text-gray-500 dark:bg-sky-950 dark:divide-gray-700 dark:border-gray-700 dark:text-gray-400 sm:px-4'

</script>

<header
    class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600"
  >
  <Navbar {navClass} {toggleNav} {closeNav} {navStatus} breakPoint="lg" fluid divChildrenClass={divClass}>

	{#snippet brand()}
		<NavBrand siteName="FlexiLexi" {closeNav} />
		<div class="flex items-center ml-auto lg:order-1">
            <Darkmode class="inline-block dark:hover:text-white hover:text-gray-900" />
        </div>
	{/snippet}
	<NavUl {ulClass}>
		<NavLi href="/" {closeNav}>Home</NavLi>
		<NavLi href="/feilds" {closeNav}>Feilds</NavLi>
		<NavLi href="/keys" {closeNav}>Keys</NavLi>
		<NavLi href="/threshold" {closeNav}>Threshold</NavLi>
		<NavLi href="/single-object" {closeNav}>Single object</NavLi>
		<NavLi href="https://github.com/shinokada/flexilexi" target="_blank" {closeNav}>GitHub</NavLi>
	</NavUl>
</Navbar>
</header>