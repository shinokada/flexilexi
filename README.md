# flexilexi

## Description

FlexiLexi is an npm package designed to facilitate dynamic and flexible searching within a dataset. Leveraging the Fuse.js library, it enables users to perform fuzzy searches with adjustable thresholds, providing relevant results even for partially matched queries. The package offers an interactive interface to fine-tune search parameters and display filtered results seamlessly.

## Features

- Fuzzy Searching: Utilizes the Fuse.js library for fuzzy searching within a provided dataset.
- Customizable Threshold: Allows users to adjust the fuzziness threshold to control search sensitivity.
- Dynamic Field Selection: Supports specifying custom fields for searching or defaults to provided keys.
- Interactive Interface:
  - Threshold Adjustment: Users can modify the threshold using a range input for real-time changes in search sensitivity.
  - Search Input: Provides an input field for users to enter search queries dynamically.
- Live Search Updates: Updates search results in real-time as users input or adjust their search queries.
- Result Display:
  - Presents search results in an unordered list.
  - Supports display customization by iterating through selected fields for each result.

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

<h1 class="text-4xl">Japanese dictionary</h1>
<h2 class="text-3xl">You can search Japanese, Romaji, and English.</h2>
<FlexiLexi {dictionary} />
```

## Props

The FlexiLexi component accepts the following props:

### dictionary: (Required) 
A dataset for performing searches. This should be a link to a file or an array/object that represents the dataset.

example-data.json:

```
[
  {
    "japanese": "行く",
    "romaji": "iku",
    "english": "go"
  },
  {
    "japanese": "見る",
    "romaji": "miru",
    "english": "see, look at"
  },
  // more lines
]
```

### keys=[]:
An optional array of strings representing the fields to search within the dataset. If specified, the search will be limited to these fields. If not provided, the default behavior is to search in all available fields.


```
<script>
  import dictionary from './data/example-data.json'
  import {FlexiLexi} from 'flexilexi'
  let keys = ['japanese', 'english']
</script>

<h1 class="text-4xl">Japanese dictionary</h1>
<h2 class="text-3xl">You can search Japanese and English.</h2>
<FlexiLexi {dictionary} {keys}/>
```

### fields=[]:
An optional array of strings determining which fields from the dataset should be displayed as search results. If not specified, it defaults to the keys provided.


```
<script>
  import dictionary from './data/example-data.json'
  import {FlexiLexi} from 'flexilexi'
  let feilds = ['japanese', 'english']
</script>

<h1 class="text-4xl">Japanese dictionary</h1>
<h2 class="text-3xl">You can search Japanese and English.</h2>
<FlexiLexi {dictionary} {feilds}/>
```

### thresholdValue=0:
An optional number (ranging from 0 to 1) that sets the fuzziness value for the search. A value of 0 signifies an exact match, while 1 represents the most flexible/fuzzy search.


```
<script>
  import dictionary from './data/example-data.json'
  import {FlexiLexi} from 'flexilexi'
</script>

<h1 class="text-4xl">Japanese dictionary</h1>
<h2 class="text-3xl">You can search Japanese and English.</h2>
<FlexiLexi {dictionary} threshold={0.6}/>
```

## Styling

Use the following classes in your style sheet:

- `.divClass`
- `.rangeLabelClass`
- `.rangeInputClass`
- `.searchLabelClass`
- `.searchInputClass`
- `.ulClass`

Use the following prop to add your custome class names:

```
- divClassName
- rangeLabelClassName
- rangeInputClassName
- searchInputClassName
- searchLabelClassName
- ulClassName
- liClassName
```

Example: 

```
<FlexiLexi 
  {dictionary} 
  {keys} 
  divClassName="customDiv"
  rangeLabelClassName="customRangeLabel"
  rangeInputClassName="customRangeInput"
  searchInputClassName="customSearchInput" 
  searchLabelClassName="customSearchLabel"
  ulClassName="customUl"
  liClassName="customLi"
/>
```

The above example produces the following html:

```
<div class="divClass customDiv">
  <label for="minmax-range" class="rangeLabelClass customRangeLabel">
    Fuzziness: 0
  </label> 
  <input id="minmax-range" type="range" min="0" max="1" step="0.2" value="0" class="rangeInputClass customRangeInput"></div> 
  <div>
    <label for="default-input" class="searchLabelClass customSearchLabel">Searching: </label>
    <input type="text" placeholder="Search..." class="searchInputClass customSearchInput">
  </div> 
  <ul class="ulClass customUl">
    <li class="liClass customLi"></li>
  </ul>
```

### CSS

Create `static/css/style.css` and add the following example:

```
.divClass {
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

.ulClass {
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

If you want to use TailwindCSS, install it using the following command:

```
npx svelte-add@latest tailwindcss
```

Update `app.pcss` by adding the following example:

```
/* Write your global styles here, in PostCSS syntax */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .divClass {
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
  .ulClass {
    @apply max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400 text-left w-96 m-auto
  }
}
```
