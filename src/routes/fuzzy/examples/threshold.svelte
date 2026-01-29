<script lang="ts">
  import data from '../../data/japanese-data.json';
  import { Fuzzy } from 'flexilexi';
</script>

<Fuzzy {data} thresholdValue={0.3} divClass="p-4" div2Class="p-4" />
