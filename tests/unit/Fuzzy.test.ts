import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Fuzzy from '../../src/lib/Fuzzy.svelte';

describe('Fuzzy', () => {
  const sampleData = [
    { name: 'Apple', category: 'Fruit', price: 1.5 },
    { name: 'Banana', category: 'Fruit', price: 0.8 },
    { name: 'Carrot', category: 'Vegetable', price: 0.6 },
    { name: 'Orange', category: 'Fruit', price: 1.2 }
  ];

  beforeEach(() => {
    vi.clearAllTimers();
  });

  it('renders with default props', () => {
    render(Fuzzy, { props: { data: sampleData } });

    expect(screen.getByLabelText('Adjust search fuzziness')).toBeInTheDocument();
    expect(screen.getByLabelText('Search input')).toBeInTheDocument();
  });

  it('displays threshold label with correct value', () => {
    render(Fuzzy, { props: { data: sampleData, thresholdValue: 0.5 } });

    expect(screen.getByText(/Fuzziness: 0\.5/)).toBeInTheDocument();
  });

  it('allows threshold adjustment via slider', async () => {
    const { container } = render(Fuzzy, {
      props: { data: sampleData, thresholdValue: 0.6 }
    });

    const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
    expect(slider).toBeInTheDocument();

    await fireEvent.input(slider, { target: { value: '0.3' } });

    expect(screen.getByText(/Fuzziness: 0\.3/)).toBeInTheDocument();
  });

  it('displays search input with placeholder', () => {
    render(Fuzzy, { props: { data: sampleData } });

    const searchInput = screen.getByPlaceholderText('Type to search...');
    expect(searchInput).toBeInTheDocument();
  });

  it('updates label when typing in search input', async () => {
    render(Fuzzy, { props: { data: sampleData } });

    const searchInput = screen.getByLabelText('Search input');
    await fireEvent.input(searchInput, { target: { value: 'apple' } });

    expect(screen.getByText(/Searching for: "apple"/)).toBeInTheDocument();
  });

  it('displays search results after debounce', async () => {
    vi.useFakeTimers();

    render(Fuzzy, {
      props: {
        data: sampleData,
        debounceMs: 300,
        thresholdValue: 0.3
      }
    });

    const searchInput = screen.getByLabelText('Search input');
    await fireEvent.input(searchInput, { target: { value: 'apple' } });

    // Fast-forward time past debounce
    vi.advanceTimersByTime(300);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('displays "No results found" message when no matches', async () => {
    vi.useFakeTimers();

    render(Fuzzy, {
      props: {
        data: sampleData,
        debounceMs: 300,
        thresholdValue: 0.1
      }
    });

    const searchInput = screen.getByLabelText('Search input');
    await fireEvent.input(searchInput, { target: { value: 'xyz123' } });

    vi.advanceTimersByTime(300);

    await waitFor(() => {
      expect(screen.getByText(/No results found for "xyz123"/)).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('accepts custom keys prop', () => {
    render(Fuzzy, {
      props: {
        data: sampleData,
        keys: ['name', 'category']
      }
    });

    expect(screen.getByLabelText('Search input')).toBeInTheDocument();
  });

  it('accepts custom fields prop for display', () => {
    render(Fuzzy, {
      props: {
        data: sampleData,
        fields: ['name']
      }
    });

    expect(screen.getByLabelText('Search input')).toBeInTheDocument();
  });

  it('handles single object data format', () => {
    const objectData = {
      apple: 'A red fruit',
      banana: 'A yellow fruit',
      carrot: 'An orange vegetable'
    };

    render(Fuzzy, { props: { data: objectData } });

    expect(screen.getByLabelText('Search input')).toBeInTheDocument();
  });

  it('applies custom CSS classes', () => {
    const { container } = render(Fuzzy, {
      props: {
        data: sampleData,
        divClass: 'custom-div',
        searchInputClass: 'custom-input',
        ulClass: 'custom-ul'
      }
    });

    expect(container.querySelector('.custom-div')).toBeInTheDocument();
    expect(container.querySelector('.custom-input')).toBeInTheDocument();
  });

  it('autofocuses search input when autofocus is true', () => {
    render(Fuzzy, {
      props: {
        data: sampleData,
        autofocus: true
      }
    });

    const searchInput = screen.getByLabelText('Search input') as HTMLInputElement;
    expect(searchInput).toHaveAttribute('autofocus');
  });

  it('displays match scores in results', async () => {
    vi.useFakeTimers();

    const { container } = render(Fuzzy, {
      props: {
        data: sampleData,
        debounceMs: 300,
        thresholdValue: 0.5
      }
    });

    const searchInput = screen.getByLabelText('Search input');
    await fireEvent.input(searchInput, { target: { value: 'apple' } });

    vi.advanceTimersByTime(300);

    await waitFor(
      () => {
        // Check for score text in the rendered output
        const scoreElement = container.querySelector('.match-score');
        expect(scoreElement).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    vi.useRealTimers();
  });

  it('clears results when search input is emptied', async () => {
    vi.useFakeTimers();

    const { container } = render(Fuzzy, {
      props: {
        data: sampleData,
        debounceMs: 300,
        thresholdValue: 0.5
      }
    });

    const searchInput = screen.getByLabelText('Search input');

    // Type and wait for results
    await fireEvent.input(searchInput, { target: { value: 'apple' } });
    vi.advanceTimersByTime(300);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    // Clear input
    await fireEvent.input(searchInput, { target: { value: '' } });
    vi.advanceTimersByTime(300);

    await waitFor(() => {
      const resultsList = container.querySelector('ul');
      expect(resultsList).not.toBeInTheDocument();
    });

    vi.useRealTimers();
  });
});
