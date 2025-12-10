type DictionaryItem = Record<string, string | number | boolean>;
interface Props {
    /** Array of objects or single object to search through */
    dictionary: DictionaryItem[] | DictionaryItem;
    /** Fields to search in (defaults to all keys in first dictionary item) */
    keys?: string[];
    /** Fields to display in results (defaults to keys) */
    fields?: string[];
    /** Initial fuzziness threshold (0.0 = exact, 1.0 = match anything) */
    thresholdValue?: number;
    /** Enable autofocus on search input */
    autofocus?: boolean;
    /** Debounce delay for search in milliseconds */
    debounceMs?: number;
    /** Custom CSS classes */
    divClass?: string;
    rangeLabelClass?: string;
    rangeInputClass?: string;
    div2Class?: string;
    searchLabelClass?: string;
    searchInputClass?: string;
    ulClass?: string;
    liClass?: string;
}
/**
 * FlexiLexi - A flexible fuzzy search component powered by Fuse.js
 *
 * ## Features
 * - 🔍 Fuzzy search with adjustable threshold
 * - ⚡ Debounced input for better performance
 * - ♿ Accessible with proper ARIA labels
 * - 🎨 Customizable styling with class props
 * - 📊 Shows match quality scores
 * - 🔄 Reactive updates as you type
 *
 * ## Usage
 * ```svelte
 * <script>
 * import { FlexiLexi } from 'flexilexi';
 *
 * const data = [
 *   { name: 'Apple', category: 'Fruit' },
 *   { name: 'Banana', category: 'Fruit' },
 *   { name: 'Carrot', category: 'Vegetable' }
 * ];
 * </script>
 *
 * <FlexiLexi
 * dictionary={data}
 * keys={['name', 'category']}
 * fields={['name']}
 * thresholdValue={0.3}
 * />
 * ```
 *
 * ## Props
 * @prop dictionary - Data to search (array or object)
 * @prop keys - Fields to search in (auto-detected if omitted)
 * @prop fields - Fields to display (defaults to keys)
 * @prop thresholdValue - Initial fuzziness (0.0-1.0, default 0.6)
 * @prop autofocus - Auto-focus search input (default true)
 * @prop debounceMs - Search debounce delay (default 300ms)
 * @prop divClass - Container class for threshold control
 * @prop rangeLabelClass - Label class for threshold
 * @prop rangeInputClass - Input class for threshold slider
 * @prop div2Class - Container class for search input
 * @prop searchLabelClass - Label class for search
 * @prop searchInputClass - Input class for search
 * @prop ulClass - Results list container class
 * @prop liClass - Individual result item class
 */
declare const FlexiLexi: import("svelte").Component<Props, {}, "">;
type FlexiLexi = ReturnType<typeof FlexiLexi>;
export default FlexiLexi;
