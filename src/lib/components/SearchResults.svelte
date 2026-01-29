<script lang="ts">
  import type { FuseResult } from 'fuse.js';
  import type { DataItem } from '../useFuzzySearch.svelte';

  interface Props {
    results: FuseResult<DataItem>[];
    fields?: string[];
    showScore?: boolean;
    onSelect?: (item: DataItem) => void;
    class?: string;
    itemClass?: string;
  }

  let {
    results,
    fields = [],
    showScore = true,
    onSelect,
    class: className = '',
    itemClass = ''
  }: Props = $props();

  function getDisplayValue(item: DataItem, field: string): string {
    const value = item[field];
    if (value === undefined || value === null) {
      return '';
    }
    return String(value);
  }

  function handleItemClick(item: DataItem) {
    if (onSelect) {
      onSelect(item);
    }
  }

  function handleKeydown(event: KeyboardEvent, item: DataItem) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleItemClick(item);
    }
  }
</script>

<ul class="results-list {className}" role="list">
  {#each results as result (result.refIndex)}
    {@const item = result.item}
    {@const displayFields = fields.length > 0 ? fields : Object.keys(item)}
    {@const isClickable = !!onSelect}

    {#if isClickable}
      <li class="result-item-wrapper">
        <button
          class="result-item {itemClass}"
          onclick={() => handleItemClick(item)}
          onkeydown={(e) => handleKeydown(e, item)}
        >
          <div class="result-content">
            {#each displayFields as field, index (field)}
              {@const value = getDisplayValue(item, field)}
              {#if value}
                <span class="field-value">{value}</span>
                {#if index < displayFields.length - 1}
                  <span class="separator">: </span>
                {/if}
              {/if}
            {/each}
          </div>

          {#if showScore && result.score !== undefined}
            <span class="match-score" aria-label="Match quality">
              ({(1 - result.score).toFixed(2)})
            </span>
          {/if}
        </button>
      </li>
    {:else}
      <li class="result-item {itemClass}">
        <div class="result-content">
          {#each displayFields as field, index (field)}
            {@const value = getDisplayValue(item, field)}
            {#if value}
              <span class="field-value">{value}</span>
              {#if index < displayFields.length - 1}
                <span class="separator">: </span>
              {/if}
            {/if}
          {/each}
        </div>

        {#if showScore && result.score !== undefined}
          <span class="match-score" aria-label="Match quality">
            ({(1 - result.score).toFixed(2)})
          </span>
        {/if}
      </li>
    {/if}
  {/each}
</ul>

<style>
  .results-list {
    list-style: disc;
    padding-left: 2rem;
    margin: 1rem 0;
  }

  .result-item-wrapper {
    list-style: none;
  }

  .result-item {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  button.result-item {
    cursor: pointer;
    padding: 0.5rem;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    border-radius: 0.25rem;
    transition: background-color 0.15s;
  }

  button.result-item:hover,
  button.result-item:focus {
    background-color: #f3f4f6;
    outline: 2px solid #3b82f6;
    outline-offset: -2px;
  }

  .result-content {
    flex: 1;
  }

  .match-score {
    font-size: 0.875rem;
    color: #888;
    font-weight: 500;
  }

  .separator {
    color: #999;
  }
</style>
