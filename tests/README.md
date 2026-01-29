# Tests

This directory contains all test files for the FlexiLexi library.

## Structure

```
tests/
├── unit/           # Unit tests for individual components
│   ├── FuzzySearch.test.ts
│   └── FuseSearch.test.ts
└── README.md
```

## Running Tests

```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run tests with coverage
npm run test:unit -- --coverage

# Run e2e tests
npm run test:e2e
```

## Writing Tests

### Unit Tests

Unit tests are located in `tests/unit/` and test individual components in isolation.

Example:

```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MyComponent from '../../src/lib/MyComponent.svelte';

describe('MyComponent', () => {
  it('renders with default props', () => {
    render(MyComponent, { props: { data: [] } });
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
```

### Test Coverage

- **FuzzySearch**: 14 tests covering threshold adjustment, search functionality, debouncing, and custom styling
- **FuseSearch**: 14 tests covering dropdown UI, keyboard navigation, callbacks, and match highlighting

## Test Configuration

- **Test Runner**: Vitest
- **Testing Library**: @testing-library/svelte
- **Environment**: jsdom (for DOM simulation)
- **Setup**: `vitest-setup-client.ts` in project root

## CI/CD

Tests are run automatically on:

- Pre-commit (if configured)
- Pull requests
- Before publishing to npm
