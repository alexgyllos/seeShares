<template lang="html">
  <div class="search">
    <div class="searchBar">
      <input v-model="searchTerm" v-on:keyup.enter="search">
      <button v-on:click="search">Search</button>
    </div>

    <!-- <div v-if="!searchResults">Waiting...</div> -->
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
      this.searchResults = null;
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

  input {
    width: 170px;
    height: 18px;
    background: white;
    padding: 5px;
    border:1px solid white;
    display: inline-block;
    vertical-align: middle;
    /* text-align: center; */
    color: rgb(7, 37, 62);
    font-size: 18px;
    /* font-weight: bold; */
    user-select: none;
    transition: 0.2s;
  }

  button {
    width: 100px;
    height: 30px;
    background: rgb(7, 37, 62);
    padding: 5px;
    border:1px solid white;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    user-select: none;
    transition: 0.2s;
  }

  button:hover {
    font-style: italic;
    cursor: pointer;
    /* background-color: rgb(36, 75, 105); */
  }

  .search {
    display: flex;
    flex-direction: column;
    /* width: 35%; */
    /* margin: 15px; */
    /* border: 1px solid white; */
    margin-top: 80px;
  }

</style>
