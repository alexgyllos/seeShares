<template lang="html">
  <div>
    <input v-model="searchTerm">
    <button v-on:click="search">Search!</button>
    <SearchResults v-if="searchResults" :searchResults="searchResults"></SearchResults>
  </div>

</template>

<script>
import SearchResults from '@/components/SearchResults.vue'

export default {
  name: 'SearchBar',
  data() {
    return {
      searchTerm: "",
      searchResults: null
    }
  },
  methods: {
    async search() {
      const searchPromise = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.searchTerm}&apikey=4FZ7Q81SX3XU7T60`)
      const result = await searchPromise.json();
      this.searchResults = result['bestMatches'];
      console.log(result);
    }
  },
  components: {
    SearchResults
  }
}
</script>

<style lang="css" scoped>
</style>
