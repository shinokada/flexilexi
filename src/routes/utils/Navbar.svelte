<script>
	import { page } from '$app/stores';
	// let { currentUrl } = $props();
	let navStatus = $state(false);
	let navClass = $derived(navStatus ? 'block' : 'hidden');
	const toggleNav = () => {
		// console.log('clicked')
		navStatus = !navStatus;
		// console.log('navStatus', navStatus)
	};

	let currentUrl = $state();

	$effect(() => {
		currentUrl = $page.url.pathname;
		// console.log('in effect',currentUrl)
	});

	const closeNav = () => {
		navStatus = false;
	};

	const linkStyle =
		'block py-2 px-3 text-md hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
	const activeStyle =
		'block py-2 px-3 text-md hover:underline text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0 dark:text-white md:dark:text-primary-500';
</script>

<nav class="border-gray-200 bg-transparent dark:bg-gray-900">
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
		<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
			<span class="self-center whitespace-nowrap text-2xl text-primary-900 font-semibold sm:text-3xl dark:text-white"
				>FlexiLexi</span
			>
		</a>
		<button
			onclick={toggleNav}
			type="button"
			class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			aria-controls="navbar-default"
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="h-5 w-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 17 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 1h15M1 7h15M1 13h15"
				/>
			</svg>
		</button>
		<div class="{navClass} w-full md:block md:w-auto" id="navbar-default">
			<ul
				class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 bg-transparent p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900"
			>
				<li>
					<a
						href="/"
						onclick={closeNav}
						aria-current={currentUrl === '/'}
						class={currentUrl === '/' ? activeStyle : linkStyle}>Home</a
					>
				</li>
				<li>
					<a
						href="/feilds"
						onclick={closeNav}
						aria-current={currentUrl === '/feilds'}
						class={currentUrl === '/feilds' ? activeStyle : linkStyle}>Feilds</a
					>
				</li>
				<li>
					<a
						href="/keys"
						onclick={closeNav}
						aria-current={currentUrl === '/keys'}
						class={currentUrl === '/keys' ? activeStyle : linkStyle}>Keys</a
					>
				</li>
				<li>
					<a
						href="/threshold"
						onclick={closeNav}
						aria-current={currentUrl === '/threshold'}
						class={currentUrl === '/threshold' ? activeStyle : linkStyle}>Threshold</a
					>
				</li>
				<li>
					<a
						href="/single-object"
						onclick={closeNav}
						aria-current={currentUrl === '/single-object'}
						class={currentUrl === '/single-object' ? activeStyle : linkStyle}>Single object</a
					>
				</li>
				<li>
					<a
						href="https://github.com/shinokada/flexilexi"
						onclick={closeNav}
						target="_blank"
						class={linkStyle}>GitHub</a
					>
				</li>
			</ul>
		</div>
	</div>
</nav>
