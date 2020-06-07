<template lang="html">
  <div>
    <input v-model="searchTerm">
    <button v-on:click="search">Search!</button>
  </div>

</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchTerm: ""
    }
  }
  methods: {
    search() {
      
    }
  }
}
</script>

<style lang="css" scoped>
</style>
