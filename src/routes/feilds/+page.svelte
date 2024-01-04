<script>
  import dictionary from '../data/example-data.json'
  import {FlexiLexi} from '$lib'

  let fields = ['japanese'] 
</script>

<h1 class="text-4xl">Feilds props example</h1>
<h2 class="text-3xl">You can search Japanese, Romaji, and English.</h2>
<FlexiLexi {dictionary} {fields} />

