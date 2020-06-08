<template lang="html">
  <div class="">
    <div v-if="!selectedShare" class="searchResults">
      <!-- <div class=""> -->

        <div class="resultsSymbol">
          <p v-for="result in searchResults">{{result['1. symbol']}}</p>
        </div>
        <div class="resultsName">
          <p v-for="result in searchResults">{{result['2. name']}}</p>
        </div>
        <!-- <div class="inputs">
          <input v-for="result in searchResults" type="number" min="0" name="numberOfShares" value="1" v-bind:value="numberOfShares">
        </div> -->
        <div class="buttons">
          <button v-for="result in searchResults" type="button" v-on:click="select(result)">Select</button>
        </div>
      <!-- </div> -->
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

  .resultsSymbol {
    display: flex;
    flex-direction: column;
    margin-right: 100px;
  }

  .resultsSymbol p {
    margin: 0px;
    text-align: left;
    /* border: 1px solid black; */
  }

  .resultsName {
    display: flex;
    flex-direction: column;
    margin-right: 100px;
  }

  .resultsName p {
    margin: 0px;
    text-align: left;
    /* border: 1px solid black; */
  }

  .inputs input {
    /* margin: 15.5px 0px; */
  }

  .inputs {
    display: flex;
    flex-direction: column;
    margin: 0px;
    /* border: 1px solid black; */

  }

  .buttons {
    display: flex;
    flex-direction: column;
    /* border: 1px solid black; */

  }

</style>
