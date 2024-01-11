<script>
	import { Navbar, NavLi, NavBrand, NavUl, uiHelpers } from 'svelte-5-ui-lib';

	let nav = uiHelpers();

	let navStatus = $state(false);
	let toggleNav = nav.toggle;
	let closeNav = nav.close;

	$effect(() => {
		// this can be done adding nav.navStatus directly to DOM element
		// without using effect
		navStatus = nav.isOpen;
	});
</script>

<Navbar {toggleNav} {closeNav} {navStatus} breakPoint="lg">
	{#snippet brand()}
		<NavBrand siteName="FlexiLexi" {closeNav} />
	{/snippet}
	<NavUl>
		<NavLi href="/" {closeNav}>Home</NavLi>
		<NavLi href="/feilds" {closeNav}>Feilds</NavLi>
		<NavLi href="/keys" {closeNav}>Keys</NavLi>
		<NavLi href="/threshold" {closeNav}>Threshold</NavLi>
		<NavLi href="/single-object" {closeNav}>Single object</NavLi>
		<NavLi href="https://github.com/shinokada/flexilexi" target="_blank" {closeNav}>GitHub</NavLi>
	</NavUl>
</Navbar>
