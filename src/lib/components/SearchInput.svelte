<script lang="ts">
  interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    showLabel?: boolean;
    autofocus?: boolean;
    isSearching?: boolean;
    class?: string;
    labelClass?: string;
    inputClass?: string;
  }

  let {
    value,
    onChange,
    placeholder = 'Type to search...',
    label = 'Search',
    showLabel = true,
    autofocus = false,
    isSearching = false,
    class: className = '',
    labelClass = '',
    inputClass = ''
  }: Props = $props();

  const displayLabel = $derived(value ? `Searching for: "${value}"` : label);
</script>

<div class="search-input-control {className}">
  {#if showLabel}
    <label for="search-input" class={labelClass}>
      {displayLabel}
      {#if isSearching}
        <span class="searching-indicator" aria-live="polite">...</span>
      {/if}
    </label>
  {/if}
  <!-- svelte-ignore a11y_autofocus -->
  <input
    id="search-input"
    type="search"
    {value}
    {placeholder}
    {autofocus}
    oninput={(e) => onChange(e.currentTarget.value)}
    class={inputClass}
    aria-label={label}
    autocomplete="off"
    spellcheck="false"
  />
</div>

<style>
  .search-input-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 500;
    font-size: 1rem;
  }

  .searching-indicator {
    color: #888;
    font-size: 0.875rem;
  }

  input[type='search'] {
    width: 100%;
    padding: 0.625rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
  }

  input[type='search']:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
</style>
