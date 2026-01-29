<script lang="ts">
  import data from '../../data/japanese-data.json';
  import { Fuzzy } from 'flexilexi';

  let fields = ['japanese', 'english'];
</script>

<Fuzzy {data} {fields} divClass="p-4" div2Class="p-4" />
