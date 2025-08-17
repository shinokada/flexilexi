interface DictionaryObject {
    [key: string]: string;
}
interface Props {
    dictionary: DictionaryObject[] | DictionaryObject;
    keys?: string[];
    fields?: string[];
    thresholdValue?: number;
    isObject?: boolean;
    autofocus?: boolean;
}
/**
 * [Go to docs](https://flexilexi.codewithshin.com/)
 * ## Props
 * @prop dictionary = []
 * @prop keys = []
 * @prop fields = []
 * @prop thresholdValue = 0
 * @prop autofocus = true
 */
declare const FlexiLexi: import("svelte").Component<Props, {}, "">;
type FlexiLexi = ReturnType<typeof FlexiLexi>;
export default FlexiLexi;
