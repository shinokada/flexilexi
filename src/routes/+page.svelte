<script>
  import dictionary from './data/example-data.json'
  import {FlexiLexi} from '$lib'

  let keys = ['japanese', 'romaji', 'english']
  
 
</script>

<h1 class="text-4xl">Japanese dictionary</h1>
<h2 class="text-3xl">You can search Japanese, Romaji, and English.</h2>
<FlexiLexi {dictionary} 
{keys} 
divClassName="customDiv"
rangeLabelClassName="customRangeLabel"
rangeInputClassName="customRangeInput"
searchInputClassName="customSearchInput" 
searchLabelClassName="customSearchLabel"
ulClassName="customUl"
liClassName="customLi"
 />

