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

<main class="max-w-screen-2xl mx-auto px-4">
  <header>
    <Heading tag="h1" class="text-3xl sm:text-4xl my-4">Fuse and Fuzzy</Heading>
    <P class="subtitle">Choose the right component for your use case</P>
  </header>

  <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
    <!-- Fuzzy -->
    <article class="p-8 border-2 border-gray-200 dark:border-gray-600 rounded-2xl">
      <header class="flex items-center justify-between mb-4">
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

      <section class="my-8 p-6 rounded-lg">
        <Heading tag="h3">Try It:</Heading>
        <Fuzzy data={sampleData} keys={['name', 'category']} thresholdValue={0.4} />
      </section>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <section class="p-4 rounded-lg border border-green-300 dark:border-green-700">
          <Heading tag="h4">✅ Pros</Heading>
          <List>
            <Li>Live threshold adjustment</Li>
            <Li>Visible match scores</Li>
            <Li>Educational value</Li>
            <Li>Transparent matching</Li>
          </List>
        </section>

        <section class="p-4 rounded-lg border border-red-300 dark:border-red-700">
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
    <article class="p-8 border-2 border-blue-500 rounded-2xl shadow-[0_0_0_4px_rgba(59,130,246,0.1)]">
      <header class="flex items-center justify-between mb-4">
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

      <section class="my-8 p-6 rounded-lg">
        <Heading tag="h3">Try It:</Heading>
        <Fuse
          data={sampleData}
          keys={['name', 'category']}
          displayFields={['name', 'category']}
          placeholder="Search languages..."
          threshold={0.4}
        />
      </section>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <section class="p-4 rounded-lg border border-green-300 dark:border-green-700">
          <Heading tag="h4">✅ Pros</Heading>
          <List>
            <Li>Match highlighting</Li>
            <Li>Keyboard navigation</Li>
            <Li>Modern dropdown UI</Li>
            <Li>Selection callbacks</Li>
            <Li>Accessibility ready</Li>
          </List>
        </section>

        <section class="p-4 rounded-lg border border-red-300 dark:border-red-700">
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
    <table class="w-full border-collapse rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th class="p-4 text-left font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-600">Feature</th>
          <th class="p-4 text-left font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-600">Fuzzy</th>
          <th class="p-4 text-left font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-600">Fuse</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Fuzzy Search</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Match Highlighting</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">❌</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Keyboard Navigation</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">❌</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Adjustable Threshold</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅ (Live slider)</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅ (Prop only)</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Match Scores</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅ Always shown</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅ Optional</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Selection Callback</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">❌</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Search Callback</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">❌</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Dropdown UI</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">❌</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Dark Mode</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">❌</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">ARIA Support</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Basic</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Full</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">Debouncing</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
        </tr>
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">TypeScript</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
          <td class="p-4 border-b border-gray-200 dark:border-gray-600">✅</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="my-16">
    <Heading tag="h2">Which Should You Use?</Heading>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <article class="p-8 border-2 border-gray-200 dark:border-gray-600 rounded-2xl">
        <Heading tag="h3">Use Fuzzy When:</Heading>
        <List>
          <Li>You want users to understand how fuzzy search works</Li>
          <Li>You need to demonstrate match scoring</Li>
          <Li>You want users to experiment with thresholds</Li>
          <Li>You're building educational content</Li>
          <Li>You need a simple, transparent search</Li>
        </List>
        <a href={resolve('/')} class="inline-block px-6 py-3 font-semibold text-gray-800 dark:text-gray-100 no-underline rounded-lg border-0 cursor-pointer transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">Fuzzy Demo →</a>
      </article>

      <article class="p-8 border-2 border-blue-500 rounded-2xl">
        <Heading tag="h3">Use Fuse When:</Heading>
        <List>
          <Li>You're building a production application</Li>
          <Li>You want a polished user experience</Li>
          <Li>You need keyboard navigation</Li>
          <Li>You want to show highlighted matches</Li>
          <Li>You need selection callbacks</Li>
          <Li>You want modern dropdown UI</Li>
        </List>
        <a href={resolve('/fuse')} class="inline-block px-6 py-3 font-semibold text-white no-underline bg-blue-500 rounded-lg border-0 cursor-pointer transition-all duration-200 hover:bg-blue-600">Fuse Demo →</a>
      </article>
    </div>
  </section>
</main>
