<template lang="html">
  <div class="">
    <div v-if="!selectedShare" class="searchResults">
        <div class="resultsName">
          <p v-for="result in searchResults" v-on:click="select(result)">{{result['2. name']}} ({{result['1. symbol']}})
          </p>

        </div>
    </div>
    <div class="">
      <SelectedSearchResult v-if="selectedShare" :selectedShare="selectedShare"></SelectedSearchResult>
    </div>
  </div>


</template>

<script>
import SelectedSearchResult from '@/components/SelectedSearchResult.vue'

export default {
  name: 'SearchResults',
  props: ['searchResults'],
  data() {
    return {
      selectedShare: null
    }
  },
  methods: {
    select(share) {
      this.selectedShare = share;
    }
  },
  components: {
    SelectedSearchResult
  }

}
</script>

<style lang="css" scoped>

  .searchResults {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    align-items: center;
    align-content: center;
    align-self: center;
    margin-top: 20px;

  }

  .searchResults input {
    width: 30px;
    text-align: center;
    margin: 0px 10px;
  }

  .searchResults button {

  }

  .resultsSymbol {
    display: flex;
    flex-direction: column;
    margin-right: 100px;
  }

  .resultsSymbol p {
    margin: 0px;
    text-align: left;

  }

  .resultsName {
    display: flex;
    flex-direction: column;
    margin-right: 10px;

  }

  .resultsName p {
    margin: 0px 0px 1px 0px;
    padding: 4px;
    font-weight: bold;
    font-size: 1em;
    text-align: center;

    transition: 0.1s;
  }

  .resultsName p:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .inputs input {

  }

  .inputs {
    display: flex;
    flex-direction: column;
    margin: 0px;


  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-self: flex-start;


  }

  button {
    width: 80px;
		height: 30px;
    background: rgb(7, 37, 62);
    padding: 5px;
    border:1px solid white;

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
    background-color: rgb(36, 75, 105);
  }

</style>
