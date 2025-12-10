# FlexiLexi

[![npm version](https://img.shields.io/npm/v/flexilexi.svg)](https://www.npmjs.com/package/flexilexi)
[![license](https://img.shields.io/npm/l/flexilexi.svg)](https://github.com/shinokada/flexilexi/blob/main/LICENSE)

> A powerful, performance-optimized Svelte 5 component for fuzzy search with real-time results and adjustable sensitivity.

## Description

FlexiLexi is a feature-rich search component built for Svelte 5 that leverages Fuse.js to provide intelligent fuzzy searching. Whether you're building a dictionary, product catalog, documentation search, or any searchable dataset, FlexiLexi delivers fast, relevant results with a customizable user interface.

**Perfect for:**

- 📚 Dictionaries and glossaries
- 🛍️ Product catalogs and e-commerce search
- 📖 Documentation and knowledge bases
- 🔍 Data exploration tools
- 📊 Dashboard filtering

**Key Highlights:**

- ⚡ **Performance-optimized**: Intelligent search index caching prevents unnecessary re-indexing
- 🎯 **Real-time adjustable threshold**: Live sensitivity slider from exact to fuzzy matching
- 🔄 **Instant results**: Debounced search with smooth UX
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🎨 **Fully customizable**: Style with CSS or Tailwind
- 📱 **Responsive**: Works great on all screen sizes

## Features

- **Fuzzy Searching**: Uses Fuse.js for flexible searches within datasets
- **Adjustable Threshold**: Live slider to control search sensitivity (0.0 = exact, 1.0 = very fuzzy)
- **Performance Optimized**: Search index is cached and only rebuilt when data changes, not on threshold adjustments
- **Dynamic Field Selection**: Customize which fields to search or let it auto-detect
- **Debounced Search**: Smooth typing experience with configurable debounce delay
- **Real-time Updates**: Instant results as you type or adjust settings
- **Match Scoring**: Shows relevance scores for each result
- **Flexible Display**: Choose which fields to show in results
- **Type-safe**: Built with TypeScript for excellent IDE support

## Demo

- [FlexiLexi](https://flexilexi.codewithshin.com/)
- [FlexiLexi-dictionary](https://flexilexi-dictionary.codewithshin.com/)

## Repo

[GitHub](https://github.com/shinokada/flexilexi)

## Requirement

- Svelte 5
- Fuse.js

## License Information

MIT

## Installation

```
npm i -D flexilexi // npm
pnpm i -D flexilexi  // pnpm
yarn add -D flexilexi // yarn
```

## Usage

```
<script>
  import dictionary from './data/example-data.json'
  import {FlexiLexi} from 'flexilexi'
</script>

<div class="wrapper">
  <h1 class="text-4xl">Japanese dictionary</h1>
  <h2 class="text-3xl">You can search Japanese, Romaji, and English.</h2>
  <FlexiLexi {dictionary} />
</div>

<style>
  .wrapper {
    text-align: center;
  }
</style>
```

## Props

The FlexiLexi component accepts the following props:

### dictionary: (Required)

A dataset for performing searches. This should be a link to a file or an array/object that represents the dataset. Use an array of objects or an object as the following examples.

example-data.json:

```
[
  {
    "key-1": "value-1",
    "key-2": "value-2",
    "key-3": "value-3"
  },
  {
    "key-1": "value-4",
    "key-2": "value-5",
    "key-3": "value-6"
  },
  // more lines
]
```

Or an object:

```
{
  "key-1": "value-1",
  "key-2": "value-2",
  "key-3": "value-3",
}
```

### keys=[]:

An optional array of strings representing the fields to search within the dataset. If specified, the search will be limited to these fields. If not provided, the default behavior is to search in all available fields.

```
<script>
  import dictionary from './data/example-data.json'
  import {FlexiLexi} from 'flexilexi'
  let keys = ['japanese', 'english']
</script>

<div class="wrapper">
  <h1 class="text-4xl">Japanese dictionary</h1>
  <h2 class="text-3xl">You can search Japanese and English.</h2>
  <FlexiLexi {dictionary} {keys}/>
</div>

<style>
  .wrapper {
    text-align: center;
  }
</style>
```

### fields=[]:

An optional array of strings determining which fields from the dataset should be displayed as search results. If not specified, it defaults to the keys provided.

```
<script>
  import dictionary from './data/example-data.json'
  import {FlexiLexi} from 'flexilexi'
  let feilds = ['japanese', 'english']
</script>

<div class="wrapper">
  <h1 class="text-4xl">Japanese dictionary</h1>
  <h2 class="text-3xl">You can search Japanese and English.</h2>
  <FlexiLexi {dictionary} {feilds}/>
</div>

<style>
  .wrapper {
    text-align: center;
  }
</style>
```

### thresholdValue=0:

An optional number (ranging from 0 to 1) that sets the fuzziness value for the search. A value of 0 signifies an exact match, while 1 represents the most flexible/fuzzy search.

```
<script>
  import dictionary from './data/example-data.json'
  import {FlexiLexi} from 'flexilexi'
</script>

<div class="wrapper">
  <h1 class="text-4xl">Japanese dictionary</h1>
  <h2 class="text-3xl">You can search Japanese and English.</h2>
  <FlexiLexi {dictionary} threshold={0.6}/>
</div>

<style>
  .wrapper {
    text-align: center;
  }
</style>
```

## Sample data

[Sample data](https://github.com/shinokada/flexilexi/tree/main/src/routes/data)

## Styling

Use the following classes to style items in your style sheet:

- `.divclass`
- `.div2class`
- `.rangeLabelClass`
- `.rangeInputClass`
- `.searchLabelClass`
- `.searchInputClass`
- `.ulclass`
- `.liclass`

### CSS

Create `static/css/style.css` and add the following example:

```
.divclass {
  margin: 1rem;
}

.rangeLabelClass {
  margin-bottom: 0.5rem;
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
}

.rangeInputClass {
  height: 0.5rem;
  width: 30%;
  cursor: pointer;
  appearance: none;
  border-radius: 0.5rem;
  background-color: #e5e7eb;
}

.searchLabelClass {
  margin-bottom: 0.5rem;
  display: block;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f2937;
}

.searchInputClass {
  display: block;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: #f3f4f6;
  padding: 0.625rem;
  font-size: 1.25rem;
  color: #1f2937;
  width: 20rem;
  margin: auto;
}

.ulclass {
  max-width: 32rem;
  list-style-position: inside;
  list-style-type: disc;
  line-height: 1.25;
  color: #4b5563;
  text-align: left;
  width: 24rem;
  margin: auto;
}
```

And add the following link to `app.html`:

```
<link rel='stylesheet' href='%sveltekit.assets%/css/style.css'>
```

### TailwindCSS

If you are using TailwindCSS, update `app.css` by adding the following example:

```
@import 'tailwindcss';

@layer components {
  .divclass {
    @apply m-4;
  }
  .rangeLabelClass {
    @apply mb-2 block text-sm font-medium text-gray-900 dark:text-white;
  }
  .rangeInputClass {
    @apply h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 sm:w-1/3 dark:bg-gray-700;
  }
  .searchLabelClass {
    @apply mb-2 block text-lg font-medium text-gray-900 dark:text-white;
  }
  .searchInputClass {
    @apply block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500 w-80 m-auto dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500
  }
  .ulclass {
    @apply max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400 text-left w-96 m-auto
  }
}

```
