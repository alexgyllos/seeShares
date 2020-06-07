<template lang="html">
  <div class="searchResults">


    <SearchResultsItem v-if="searchResults" v-for="result in searchResults" :result="result"></SearchResultsItem>


  </div>

</template>

<script>
import SearchResultsItem from '@/components/SearchResultsItem.vue'

export default {
  name: 'SearchResults',
  props: ['searchResults'],
  data() {
    return {
      numberOfShares: 1
    }
  },
  methods: {
    bookIt(numberOfShares) {
      console.log(numberOfShares);
    }
  },
  components: {
    SearchResultsItem
  }

}
</script>

<style lang="css" scoped>

  .searchResults {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    align-content: center;
    align-self: center;
    /* border: 1px solid black; */
    margin: 20px;

  }

  .searchResults input {
    width: 30px;
    text-align: center;
    margin: 0px 10px;
  }

  .searchResults button {
    /* padding: 5px; */
  }



</style>
