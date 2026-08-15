<script>
  import { Fuzzy, Fuse } from '$lib';
  import { resolve } from '$app/paths';
  import { Heading, P, List, Li, Badge } from 'flowbite-svelte';

  const sampleData = [
    { name: 'JavaScript', category: 'Programming', difficulty: 'Medium' },
    { name: 'Python', category: 'Programming', difficulty: 'Easy' },
    { name: 'TypeScript', category: 'Programming', difficulty: 'Medium' },
    { name: 'React', category: 'Framework', difficulty: 'Medium' },
    { name: 'Svelte', category: 'Framework', difficulty: 'Easy' },
    { name: 'Vue', category: 'Framework', difficulty: 'Easy' }
  ];
</script>

<svelte:head>
  <title>Fuse and Fuzzy</title>
</svelte:head>

<main class="mx-auto max-w-screen-2xl px-4">
  <header>
    <Heading tag="h1" class="my-4 text-3xl sm:text-4xl">Fuse and Fuzzy</Heading>
    <P class="subtitle">Choose the right component for your use case</P>
  </header>

  <section class="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
    <!-- Fuzzy -->
    <article class="rounded-2xl border-2 border-gray-200 p-8 dark:border-gray-600">
      <header class="mb-4 flex items-center justify-between">
        <Heading tag="h2">Fuzzy</Heading>
        <Badge>Original</Badge>
      </header>

      <P class="description">
        Educational and transparent search component with adjustable threshold slider
      </P>

      <section class="features">
        <Heading tag="h3">Best For:</Heading>
        <List>
          <Li>📚 Learning fuzzy search concepts</Li>
          <Li>🔍 Understanding match scoring</Li>
          <Li>🎓 Educational demos</Li>
          <Li>📊 Data exploration tools</Li>
        </List>
      </section>

      <section class="my-8 rounded-lg p-6">
        <Heading tag="h3">Try It:</Heading>
        <Fuzzy data={sampleData} keys={['name', 'category']} thresholdValue={0.4} />
      </section>

      <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section class="rounded-lg border border-green-300 p-4 dark:border-green-700">
          <Heading tag="h4">✅ Pros</Heading>
          <List>
            <Li>Live threshold adjustment</Li>
            <Li>Visible match scores</Li>
            <Li>Educational value</Li>
            <Li>Transparent matching</Li>
          </List>
        </section>

        <section class="rounded-lg border border-red-300 p-4 dark:border-red-700">
          <Heading tag="h4">❌ Cons</Heading>
          <List>
            <Li>No result highlighting</Li>
            <Li>No keyboard navigation</Li>
            <Li>Results always visible</Li>
            <Li>Basic UI</Li>
          </List>
        </section>
      </div>
    </article>

    <!-- Fuse -->
    <article
      class="rounded-2xl border-2 border-blue-500 p-8 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
    >
      <header class="mb-4 flex items-center justify-between">
        <Heading tag="h2">Fuse</Heading>
        <Badge color="green">Recommended</Badge>
      </header>

      <P class="description">
        Modern search component with dropdown results, highlighting, and keyboard navigation
      </P>

      <section class="features">
        <Heading tag="h3">Best For:</Heading>
        <List>
          <Li>🛍️ E-commerce product search</Li>
          <Li>📝 Documentation search</Li>
          <Li>🎯 Autocomplete/typeahead</Li>
          <Li>💼 Production applications</Li>
        </List>
      </section>

      <section class="my-8 rounded-lg p-6">
        <Heading tag="h3">Try It:</Heading>
        <Fuse
          data={sampleData}
          keys={['name', 'category']}
          displayFields={['name', 'category']}
          placeholder="Search languages..."
          threshold={0.4}
        />
      </section>

      <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section class="rounded-lg border border-green-300 p-4 dark:border-green-700">
          <Heading tag="h4">✅ Pros</Heading>
          <List>
            <Li>Match highlighting</Li>
            <Li>Keyboard navigation</Li>
            <Li>Modern dropdown UI</Li>
            <Li>Selection callbacks</Li>
            <Li>Accessibility ready</Li>
          </List>
        </section>

        <section class="rounded-lg border border-red-300 p-4 dark:border-red-700">
          <h4 class="mt-0 text-base text-red-900 dark:text-red-200">❌ Cons</h4>
          <List>
            <Li>No threshold slider</Li>
            <Li>Fixed threshold</Li>
            <Li>More complex API</Li>
          </List>
        </section>
      </div>
    </article>
  </section>

  <section class="my-16">
    <Heading tag="h2">Feature Comparison</Heading>
    <table class="w-full border-collapse overflow-hidden rounded-lg">
      <thead>
        <tr>
          <th
            class="border-b border-gray-200 p-4 text-left font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100"
            >Feature</th
          >
          <th
            class="border-b border-gray-200 p-4 text-left font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100"
            >Fuzzy</th
          >
          <th
            class="border-b border-gray-200 p-4 text-left font-semibold text-gray-800 dark:border-gray-600 dark:text-gray-100"
            >Fuse</th
          >
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Fuzzy Search</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Match Highlighting</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">❌</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Keyboard Navigation</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">❌</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Adjustable Threshold</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅ (Live slider)</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅ (Prop only)</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Match Scores</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅ Always shown</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅ Optional</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Selection Callback</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">❌</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Search Callback</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">❌</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Dropdown UI</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">❌</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Dark Mode</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">❌</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">ARIA Support</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Basic</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Full</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">Debouncing</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">TypeScript</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
          <td class="border-b border-gray-200 p-4 dark:border-gray-600">✅</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="my-16">
    <Heading tag="h2">Which Should You Use?</Heading>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <article class="rounded-2xl border-2 border-gray-200 p-8 dark:border-gray-600">
        <Heading tag="h3">Use Fuzzy When:</Heading>
        <List>
          <Li>You want users to understand how fuzzy search works</Li>
          <Li>You need to demonstrate match scoring</Li>
          <Li>You want users to experiment with thresholds</Li>
          <Li>You're building educational content</Li>
          <Li>You need a simple, transparent search</Li>
        </List>
        <a
          href={resolve('/')}
          class="inline-block cursor-pointer rounded-lg border-0 px-6 py-3 font-semibold text-gray-800 no-underline transition-all duration-200 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700"
          >Fuzzy Demo →</a
        >
      </article>

      <article class="rounded-2xl border-2 border-blue-500 p-8">
        <Heading tag="h3">Use Fuse When:</Heading>
        <List>
          <Li>You're building a production application</Li>
          <Li>You want a polished user experience</Li>
          <Li>You need keyboard navigation</Li>
          <Li>You want to show highlighted matches</Li>
          <Li>You need selection callbacks</Li>
          <Li>You want modern dropdown UI</Li>
        </List>
        <a
          href={resolve('/fuse')}
          class="inline-block cursor-pointer rounded-lg border-0 bg-blue-500 px-6 py-3 font-semibold text-white no-underline transition-all duration-200 hover:bg-blue-600"
          >Fuse Demo →</a
        >
      </article>
    </div>
  </section>
</main>
