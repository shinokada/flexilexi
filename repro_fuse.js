import Fuse from 'fuse.js';

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

const keys = ['name', 'brand', 'category'];
const threshold = 0.3;
const highlightMatches = true;

const fuseOptions = {
  keys: keys,
  threshold,
  includeScore: true,
  includeMatches: highlightMatches,
  minMatchCharLength: 1,
  shouldSort: true,
  location: 0,
  distance: 100
};

console.log('Creating Fuse instance...');
const fuse = new Fuse(products, fuseOptions);

const queries = ['macbook', 'phone', 'audio', 'mause', 'a', '', ' '];

queries.forEach((q) => {
  console.log(`Searching for "${q}"...`);
  const results = fuse.search(q);
  console.log(`Found ${results.length} results.`);
  if (results.length > 0 && results[0].matches) {
    console.log('Matches found:', results[0].matches.length);
    results[0].matches.forEach((m) => {
      if (m.indices) {
        // console.log('Indices:', m.indices);
      }
    });
  }
});

console.log('Done.');
