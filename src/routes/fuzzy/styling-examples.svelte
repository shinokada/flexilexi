<script>
  import { HighlightCompo } from 'svelte-rune-highlight';
  import 'highlight.js/styles/github-dark.css';

  const exampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`fibonacci(\${i}) = \${fibonacci(i)}\`);
}`;
</script>

<div class="styling-examples">
  <h2>Styling Examples for svelte-rune-highlight</h2>

  <!-- Example 1: Default -->
  <section class="example-section">
    <h3>1. Default Style</h3>
    <HighlightCompo code={exampleCode} lang="javascript" />
  </section>

  <!-- Example 2: Custom Theme -->
  <section class="example-section theme-custom">
    <h3>2. Custom Purple Theme</h3>
    <HighlightCompo code={exampleCode} lang="javascript" class="custom-purple" />
  </section>

  <!-- Example 3: Retro Terminal -->
  <section class="example-section theme-retro">
    <h3>3. Retro Terminal Style</h3>
    <HighlightCompo code={exampleCode} lang="javascript" class="retro-terminal" />
  </section>

  <!-- Example 4: Minimal Light -->
  <section class="example-section theme-minimal">
    <h3>4. Minimal Light Theme</h3>
    <HighlightCompo code={exampleCode} lang="javascript" class="minimal-light" />
  </section>

  <!-- Example 5: Custom Font & Spacing -->
  <section class="example-section theme-spacious">
    <h3>5. Large & Spacious</h3>
    <HighlightCompo code={exampleCode} lang="javascript" class="large-spacious" />
  </section>
</div>

<style>
  .styling-examples {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #1f2937;
  }

  .example-section {
    margin-bottom: 3rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #374151;
  }

  /* Custom Purple Theme */
  .theme-custom {
    --code-padding: 1.5rem;
    --code-font-family: 'JetBrains Mono', 'Fira Code', monospace;
    --langtag-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --langtag-color: white;
    --langtag-padding: 0.5rem 1rem;
    --langtag-border-radius: 0.5rem;
    --highlighted-background: rgba(102, 126, 234, 0.2);
  }

  :global(.custom-purple) {
    border-radius: 0.75rem;
    overflow: hidden;
    border: 2px solid #667eea;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  /* Retro Terminal Style */
  .theme-retro {
    --code-padding: 1.5rem;
    --code-font-family: 'Courier New', monospace;
    --code-font-size: 0.875rem;
    --code-line-height: 1.6;
    --langtag-background: #00ff00;
    --langtag-color: #000;
    --langtag-text-transform: uppercase;
    --langtag-font-family: 'Courier New', monospace;
    --highlighted-background: rgba(0, 255, 0, 0.1);
  }

  :global(.retro-terminal) {
    background: #000;
    color: #00ff00;
    border: 2px solid #00ff00;
    border-radius: 0;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
    font-family: 'Courier New', monospace;
  }

  :global(.retro-terminal code) {
    color: #00ff00 !important;
  }

  /* Minimal Light Theme */
  .theme-minimal {
    --code-padding: 1rem;
    --code-font-family: 'SF Mono', 'Monaco', monospace;
    --code-font-size: 0.875rem;
    --langtag-background: transparent;
    --langtag-color: #64748b;
    --langtag-border-radius: 0.25rem;
    --border-color: #e2e8f0;
  }

  :global(.minimal-light) {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
  }

  /* Large & Spacious */
  .theme-spacious {
    --code-padding: 2rem;
    --code-font-family: 'Fira Code', monospace;
    --code-font-size: 1.125rem;
    --code-line-height: 1.8;
    --langtag-background: #f59e0b;
    --langtag-color: white;
    --langtag-font-size: 0.875rem;
    --langtag-padding: 0.5rem 1rem;
  }

  :global(.large-spacious) {
    border-radius: 1rem;
    border: 2px solid #f59e0b;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>
