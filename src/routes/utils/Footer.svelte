<script lang="ts">
  import { Footer, FooterBrand, FooterLink, FooterLinkGroup } from 'flowbite-svelte';

  const version = __VERSION__;
  const svelteVersion = __SVELTE_VERSION__;
  const svelteKitVersion = __SVELTEKIT_VERSION__;
  const viteVersion = __VITE_VERSION__;
  const fuseVersion = __FUSEVERSION__;
</script>

<Footer class="shadow-none dark:bg-sky-950" footerType="logo">
  <div class="sm:flex sm:items-center sm:justify-between">
    <FooterBrand href="/" name="LexiLearn Hub" />
    <FooterLinkGroup
      class="mt-3 flex flex-wrap items-center px-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
    >
      <FooterLink href="https://github.com/shinokada/flexilexi" target="_blank"
        >Flexilexi: {version}</FooterLink
      >
      <FooterLink href="https://svelte-5-preview.vercel.app/docs/introduction" target="_blank"
        >Svelte: {svelteVersion}</FooterLink
      >
      <FooterLink href="https://kit.svelte.dev/docs/introduction" target="_blank"
        >SvelteKit: {svelteKitVersion}</FooterLink
      >
      <FooterLink href="https://github.com/krisk/fuse" target="_blank"
        >Fuse: {fuseVersion}</FooterLink
      >
      <FooterLink href="https://vitejs.dev/" target="_blank">Vite: {viteVersion}</FooterLink>
    </FooterLinkGroup>
  </div>
</Footer>
