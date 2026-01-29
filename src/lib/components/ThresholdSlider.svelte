<script lang="ts">
  interface Props {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    showValue?: boolean;
    class?: string;
    labelClass?: string;
    inputClass?: string;
  }

  let {
    value,
    onChange,
    min = 0,
    max = 1,
    step = 0.1,
    label = 'Fuzziness',
    showValue = true,
    class: className = '',
    labelClass = '',
    inputClass = ''
  }: Props = $props();
</script>

<div class="threshold-control {className}">
  <label for="threshold-slider" class={labelClass}>
    {label}{showValue ? `: ${value.toFixed(1)}` : ''}
  </label>
  <input
    id="threshold-slider"
    type="range"
    {min}
    {max}
    {step}
    {value}
    oninput={(e) => onChange(Number(e.currentTarget.value))}
    class={inputClass}
    aria-label={label}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
  />
</div>

<style>
  .threshold-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 500;
    font-size: 0.875rem;
  }

  input[type='range'] {
    width: 100%;
    cursor: pointer;
  }
</style>
