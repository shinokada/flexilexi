<script lang="ts">
  import data from '../../data/japanese-data.json';
  import { Fuzzy } from 'flexilexi';

  let keys = ['romaji', 'english'];
</script>

<Fuzzy {data} {keys} divClass="p-4" div2Class="p-4" />
