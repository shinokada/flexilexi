# FuseSearch Component

A modern, streamlined fuzzy search component for Svelte 5 with result highlighting, keyboard navigation, and advanced features.

## Features

- 🎯 **Match Highlighting** - See exactly which parts matched your search
- ⌨️ **Keyboard Navigation** - Arrow keys, Enter, Escape support
- ⚡ **Optimized Performance** - Debounced search with smart caching
- 🎨 **Fully Customizable** - Custom styles via CSS classes
- ♿ **Accessible** - Full ARIA support and semantic HTML
- 🌙 **Dark Mode** - Automatic dark mode support
- 📱 **Responsive** - Works great on all screen sizes
- 🔔 **Event Callbacks** - React to searches and selections

## Basic Usage

```svelte
<script>
  import { FuseSearch } from 'flexilexi';

  const products = [
    { name: 'MacBook Pro', brand: 'Apple', price: 2499 },
    { name: 'Dell XPS 15', brand: 'Dell', price: 1799 },
    { name: 'ThinkPad X1', brand: 'Lenovo', price: 1399 }
  ];
</script>

<FuseSearch
  data={products}
  keys={['name', 'brand']}
  displayFields={['name', 'brand']}
  placeholder="Search products..."
/>
```

## Props

| Prop               | Type                       | Default       | Description                                     |
| ------------------ | -------------------------- | ------------- | ----------------------------------------------- |
| `data`             | `DataItem[]`               | `[]`          | **Required.** Array of objects to search        |
| `keys`             | `string[]`                 | `[]`          | Fields to search in (auto-detected if omitted)  |
| `displayFields`    | `string[]`                 | `[]`          | Fields to display in results (defaults to keys) |
| `threshold`        | `number`                   | `0.4`         | Fuzziness level (0.0 = exact, 1.0 = very fuzzy) |
| `placeholder`      | `string`                   | `"Search..."` | Input placeholder text                          |
| `autofocus`        | `boolean`                  | `false`       | Auto-focus the search input                     |
| `debounce`         | `number`                   | `150`         | Debounce delay in milliseconds                  |
| `maxResults`       | `number`                   | `50`          | Maximum number of results to display            |
| `highlightMatches` | `boolean`                  | `true`        | Show highlighted matching text                  |
| `showScore`        | `boolean`                  | `false`       | Display match quality scores                    |
| `keyboardNav`      | `boolean`                  | `true`        | Enable keyboard navigation                      |
| `class`            | `string`                   | `""`          | Custom CSS class for container                  |
| `inputClass`       | `string`                   | `""`          | Custom CSS class for input                      |
| `resultsClass`     | `string`                   | `""`          | Custom CSS class for results list               |
| `resultItemClass`  | `string`                   | `""`          | Custom CSS class for result items               |
| `onselect`         | `(item) => void`           | `undefined`   | Callback when item is selected                  |
| `onsearch`         | `(query, results) => void` | `undefined`   | Callback when search is performed               |

## Advanced Examples

### With Selection Callback

```svelte
<script>
  import { FuseSearch } from 'flexilexi';

  let selectedProduct = $state(null);

  function handleSelect(item) {
    selectedProduct = item;
    console.log('Selected:', item);
  }
</script>

<FuseSearch data={products} keys={['name', 'brand']} onselect={handleSelect} />

{#if selectedProduct}
  <div>Selected: {selectedProduct.name}</div>
{/if}
```

### With Search Analytics

```svelte
<script>
  import { FuseSearch } from 'flexilexi';

  function handleSearch(query, results) {
    console.log(`Searched for "${query}", found ${results.length} results`);
    // Send to analytics
    analytics.track('search', { query, resultCount: results.length });
  }
</script>

<FuseSearch data={products} onsearch={handleSearch} />
```

### Custom Styling

```svelte
<FuseSearch
  data={products}
  class="my-search"
  inputClass="custom-input"
  resultsClass="custom-results"
  resultItemClass="custom-item"
/>

<style>
  :global(.my-search) {
    max-width: 600px;
    margin: 0 auto;
  }

  :global(.custom-input) {
    border: 2px solid #3b82f6;
    font-size: 1.125rem;
  }

  :global(.custom-results) {
    border: 2px solid #3b82f6;
  }

  :global(.custom-item:hover) {
    background-color: #dbeafe;
  }
</style>
```

### With Match Scores

```svelte
<FuseSearch data={products} keys={['name', 'description']} showScore={true} threshold={0.5} />
```

### Strict Search (Low Threshold)

```svelte
<!-- For more exact matching -->
<FuseSearch data={products} threshold={0.2} placeholder="Strict search..." />
```

### Fuzzy Search (High Threshold)

```svelte
<!-- For typo-tolerant matching -->
<FuseSearch data={products} threshold={0.6} placeholder="Fuzzy search..." />
```

## Keyboard Shortcuts

| Key     | Action                  |
| ------- | ----------------------- |
| `↓`     | Move selection down     |
| `↑`     | Move selection up       |
| `Enter` | Select highlighted item |
| `Esc`   | Close results dropdown  |

## Styling

The component comes with default styles but can be fully customized:

### CSS Classes

- `.fuse-search-container` - Main container
- `.fuse-search-input` - Search input field
- `.fuse-search-results` - Results dropdown
- `.fuse-search-result-item` - Individual result item
- `.fuse-search-result-item.selected` - Selected/highlighted item
- `.fuse-highlight` - Highlighted match text

### Example Custom Styles

```css
/* Custom highlight color */
:global(.fuse-highlight) {
  background-color: #fef3c7;
  color: #92400e;
  font-weight: 700;
}

/* Custom result hover */
:global(.fuse-search-result-item:hover) {
  background-color: #eff6ff;
  border-left: 3px solid #3b82f6;
}

/* Custom input focus */
:global(.fuse-search-input:focus) {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}
```

## TypeScript Support

Full TypeScript support with proper types:

```typescript
import type { FuseResult } from 'fuse.js';
import { FuseSearch } from 'flexilexi';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
}

const products: Product[] = [...];

function handleSelect(item: Record<string, any>) {
  const product = item as Product;
  console.log(product.name);
}
```

## Comparison with FlexiLexi

| Feature                     | FuseSearch       | FlexiLexi               |
| --------------------------- | ---------------- | ----------------------- |
| Result Highlighting         | ✅               | ❌                      |
| Keyboard Navigation         | ✅               | ❌                      |
| Dropdown Results            | ✅               | ❌                      |
| Adjustable Threshold Slider | ❌               | ✅                      |
| Match Scores                | Optional         | Always shown            |
| Use Case                    | Modern search UI | Educational/transparent |

## Tips

1. **Threshold Selection**:
   - `0.0 - 0.2`: Very strict, near-exact matches
   - `0.3 - 0.4`: Balanced (recommended for most cases)
   - `0.5 - 0.7`: Fuzzy, typo-tolerant
   - `0.8 - 1.0`: Very loose matching

2. **Performance**:
   - Use `maxResults` to limit displayed results
   - Adjust `debounce` based on dataset size
   - Consider lazy loading for very large datasets (1000+ items)

3. **Accessibility**:
   - Always provide meaningful `placeholder` text
   - Consider adding `aria-label` to describe the search purpose
   - Test with keyboard-only navigation

4. **Search Keys**:
   - Include all searchable fields in `keys`
   - Use `displayFields` to show only relevant info
   - Consider including hidden fields for better matching

## Demo

Visit [flexilexi.codewithshin.com/fuse-search](https://flexilexi.codewithshin.com/fuse-search) for a live demo.

## License

MIT
