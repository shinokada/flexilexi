<script>
  import { removeHyphensAndCapitalize } from 'runes-meta-tags';
  /*eslint no-undef: "off"*/
  const name = __NAME__;
  const version = __VERSION__;
  const svelteVersion = __SVELTE_VERSION__;
  const svelteKitVersion = __SVELTEKIT_VERSION__;
  const viteVersion = __VITE_VERSION__;
</script>

<div class="mx-auto max-w-4xl p-8 text-left">
  <h1 class="text-3xl">LexiLearn Hub Apps</h1>

  <ul class="list-disc p-4 text-left text-lg dark:text-gray-400">
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://gjett-norsk.codewithshin.com/"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">Gjett Norsk</a
      >
    </li>
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://multilanguage-flashcard.codewithshin.com/"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">Multilanguage flashcard</a
      >
    </li>
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://norske-flashcard.codewithshin.com/"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">Norske flashcard</a
      >
    </li>
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://nihongo-flashcard.codewithshin.com/"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">Japanese flashcard</a
      >
    </li>
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://flexilexi-dictionary.codewithshin.com/"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">Fexilexi dictionary (English/Norwegian/Japanese)</a
      >
    </li>
  </ul>

  <h2 class="my-2 text-2xl">Technical info</h2>
  <ul class="list-disc p-4 text-left text-lg dark:text-gray-400">
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://flexilexi.codewithshin.com/"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">{removeHyphensAndCapitalize(name)} : {version}</a
      >
    </li>
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://svelte.dev/"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">Svelte: {svelteVersion}</a
      >
    </li>
    <li>
      <a
        href="https://kit.svelte.dev/docs/introduction"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">SvelteKit: {svelteKitVersion}</a
      >
    </li>
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://vitejs.dev/"
        class="hover:underline"
        target="_blank"
        rel="noopener noreferrer external">Vite: {viteVersion}</a
      >
    </li>
  </ul>

  <h2 class="my-2 text-2xl">Repo</h2>
  <ul class="list-disc p-4 text-left text-lg dark:text-gray-400">
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://github.com/shinokada/flexilexi.git"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">Github repo</a
      >
    </li>
    <li class="hover:text-red-700 hover:underline">
      <a
        href="https://codewithshin.com"
        class="me-4 hover:underline md:me-6"
        target="_blank"
        rel="noopener noreferrer external">Author: codewithshin.com</a
      >
    </li>
  </ul>
</div>
