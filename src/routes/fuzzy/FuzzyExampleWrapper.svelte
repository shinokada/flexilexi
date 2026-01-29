<script lang="ts">
  import { ExampleWrapper, transformComponents, transformModules } from 'svelte-rune-highlight';
  import type { Component } from 'svelte';

  // Import components dynamically
  const componentModules = import.meta.glob('./examples/*.svelte', {
    eager: true
  }) as Record<string, { default: Component }>;

  // Import source code
  const exampleModules = import.meta.glob('./examples/*.svelte', {
    query: '?raw',
    import: 'default',
    eager: true
  }) as Record<string, string>;

  // Transform both using helper functions
  const components = transformComponents(componentModules);
  const modules = transformModules(exampleModules);

  // Hot reload support - this will force a full reload when files in examples/ change
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      import.meta.hot?.invalidate();
    });
  }

  interface Props {
    name: string;
  }
  let { name }: Props = $props();
</script>

<ExampleWrapper {name} {components} {modules} />
