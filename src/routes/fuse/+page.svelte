<script lang="ts">
  import { Fuse } from '$lib';
  import type { FuseResult } from 'fuse.js';

  // Sample data
  const products = [
    { name: 'MacBook Pro 16"', brand: 'Apple', category: 'Laptops', price: 2499 },
    { name: 'MacBook Air M2', brand: 'Apple', category: 'Laptops', price: 1199 },
    { name: 'iPhone 15 Pro', brand: 'Apple', category: 'Phones', price: 999 },
    { name: 'iPad Pro', brand: 'Apple', category: 'Tablets', price: 799 },
    { name: 'AirPods Pro', brand: 'Apple', category: 'Audio', price: 249 },
    { name: 'Magic Mouse', brand: 'Apple', category: 'Accessories', price: 79 },
    { name: 'Magic Keyboard', brand: 'Apple', category: 'Accessories', price: 99 },
    { name: 'Dell XPS 15', brand: 'Dell', category: 'Laptops', price: 1799 },
    { name: 'Dell UltraSharp Monitor', brand: 'Dell', category: 'Monitors', price: 599 },
    { name: 'Samsung Galaxy S24', brand: 'Samsung', category: 'Phones', price: 899 },
    { name: 'Samsung Tab S9', brand: 'Samsung', category: 'Tablets', price: 649 },
    { name: 'Sony WH-1000XM5', brand: 'Sony', category: 'Audio', price: 399 },
    { name: 'Logitech MX Master 3', brand: 'Logitech', category: 'Accessories', price: 99 },
    { name: 'Logitech Webcam', brand: 'Logitech', category: 'Accessories', price: 129 }
  ];

  type ProductItem = (typeof products)[number];

  let selectedItem = $state<ProductItem | null>(null);
  let searchLog = $state<string[]>([]);
  let selectedItem2 = $state<ProductItem | null>(null);
  let searchLog2 = $state<string[]>([]);

  function handleSelect(item: Record<string, string | number | boolean>) {
    selectedItem = item as ProductItem;
  }

  function handleSearch(
    query: string,
    results: FuseResult<Record<string, string | number | boolean>>[]
  ) {
    searchLog = [
      `Searched: "${query}" - Found ${results.length} results`,
      ...searchLog.slice(0, 4)
    ];
  }

  function handleSelect2(item: Record<string, string | number | boolean>) {
    selectedItem2 = item as ProductItem;
  }

  function handleSearch2(
    query: string,
    results: FuseResult<Record<string, string | number | boolean>>[]
  ) {
    searchLog2 = [
      `Searched: "${query}" - Found ${results.length} results`,
      ...searchLog2.slice(0, 4)
    ];
  }

  // Stable configuration objects to prevent re-renders
  const searchKeys = ['name', 'brand', 'category'];
  const displayFields = ['name', 'brand', 'category'];
  const advancedKeys = ['name', 'brand'];
  const advancedDisplayFields = ['name', 'price'];
</script>

<svelte:head>
  <title>Fuse Demo - Modern Fuzzy Search Component</title>
</svelte:head>

<div class="container">
  <header>
    <h1>Fuse Component</h1>
    <p class="subtitle">
      A modern, streamlined fuzzy search component with highlighting and keyboard navigation
    </p>
  </header>

  <div class="demo-section">
    <h2>Basic Search</h2>
    <p class="description">
      Try searching for products: "macbook", "phone", "audio", or even misspellings like "mause"
    </p>

    <Fuse
      data={products}
      keys={searchKeys}
      {displayFields}
      placeholder="Search products..."
      threshold={0.3}
      onselect={handleSelect}
      onsearch={handleSearch}
    />
  </div>

  {#if selectedItem}
    <div class="selected-item">
      <h3>Selected Item:</h3>
      <div class="item-details">
        <p><strong>Name:</strong> {selectedItem.name}</p>
        <p><strong>Brand:</strong> {selectedItem.brand}</p>
        <p><strong>Category:</strong> {selectedItem.category}</p>
        <p><strong>Price:</strong> ${selectedItem.price}</p>
      </div>
    </div>
  {/if}

  {#if searchLog.length > 0}
    <div class="search-log">
      <h3>Search Log:</h3>
      <ul>
        {#each searchLog as log, index (index)}
          <li>{log}</li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="features">
    <h2>Features</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3>Match Highlighting</h3>
        <p>See exactly which parts of the text matched your search query</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">⌨️</div>
        <h3>Keyboard Navigation</h3>
        <p>Use arrow keys to navigate, Enter to select, Escape to close</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Debounced Search</h3>
        <p>Smooth performance with optimized search delays</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h3>Customizable</h3>
        <p>Full control over styling and behavior</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">♿</div>
        <h3>Accessible</h3>
        <p>Built with ARIA support and semantic HTML</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🌙</div>
        <h3>Dark Mode</h3>
        <p>Automatic dark mode support built-in</p>
      </div>
    </div>
  </div>

  <div class="demo-section">
    <h2>Advanced Example</h2>
    <p class="description">Search with score display enabled - shows match quality percentage</p>

    <Fuse
      data={products}
      keys={advancedKeys}
      displayFields={advancedDisplayFields}
      placeholder="Search with scores..."
      threshold={0.4}
      showScore={true}
      maxResults={10}
      onselect={handleSelect2}
      onsearch={handleSearch2}
    />
  </div>

  {#if selectedItem2}
    <div class="selected-item">
      <h3>Selected Item (Advanced):</h3>
      <div class="item-details">
        <p><strong>Name:</strong> {selectedItem2.name}</p>
        <p><strong>Brand:</strong> {selectedItem2.brand}</p>
        <p><strong>Category:</strong> {selectedItem2.category}</p>
        <p><strong>Price:</strong> ${selectedItem2.price}</p>
      </div>
    </div>
  {/if}

  {#if searchLog2.length > 0}
    <div class="search-log">
      <h3>Advanced Search Log:</h3>
      <ul>
        {#each searchLog2 as log, index (index)}
          <li>{log}</li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="keyboard-shortcuts">
    <h2>Keyboard Shortcuts</h2>
    <div class="shortcuts-grid">
      <div class="shortcut">
        <kbd>↓</kbd>
        <span>Move down</span>
      </div>
      <div class="shortcut">
        <kbd>↑</kbd>
        <span>Move up</span>
      </div>
      <div class="shortcut">
        <kbd>Enter</kbd>
        <span>Select item</span>
      </div>
      <div class="shortcut">
        <kbd>Esc</kbd>
        <span>Close results</span>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  header {
    text-align: center;
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.125rem;
    color: #6b7280;
    margin: 0;
  }

  .demo-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .description {
    color: #6b7280;
    margin-bottom: 1.5rem;
  }

  .selected-item {
    padding: 1.5rem;
    margin-bottom: 2rem;
    background-color: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 0.5rem;
  }

  .selected-item h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #166534;
  }

  .item-details p {
    margin: 0.5rem 0;
    color: #166534;
  }

  .search-log {
    padding: 1.5rem;
    margin-bottom: 2rem;
    background-color: #eff6ff;
    border: 1px solid #93c5fd;
    border-radius: 0.5rem;
  }

  .search-log h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #1e40af;
  }

  .search-log ul {
    margin: 0;
    padding-left: 1.5rem;
    color: #1e40af;
  }

  .search-log li {
    margin: 0.25rem 0;
  }

  .features {
    margin: 4rem 0;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .feature-card {
    padding: 1.5rem;
    text-align: center;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    transition: all 0.2s;
  }

  .feature-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .feature-card h3 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .feature-card p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;
  }

  .keyboard-shortcuts {
    margin: 3rem 0;
  }

  .shortcuts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .shortcut {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
  }

  kbd {
    padding: 0.25rem 0.75rem;
    font-family: monospace;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
    background-color: #fff;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .shortcut span {
    color: #6b7280;
    font-size: 0.875rem;
  }

  @media (prefers-color-scheme: dark) {
    h1,
    h2 {
      color: #f9fafb;
    }

    .subtitle,
    .description {
      color: #9ca3af;
    }

    .demo-section {
      background-color: #1f2937;
      border-color: #374151;
    }

    .feature-card {
      background-color: #1f2937;
      border-color: #374151;
    }

    .feature-card p {
      color: #9ca3af;
    }

    .shortcut {
      background-color: #1f2937;
      border-color: #374151;
    }

    kbd {
      color: #f9fafb;
      background-color: #374151;
      border-color: #4b5563;
    }

    .shortcut span {
      color: #9ca3af;
    }
  }
</style>
