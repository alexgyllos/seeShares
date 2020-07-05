<template lang="html">
  <div class="">
    <div v-if="!selectedShare" class="searchResults">
      <!-- <div class=""> -->

        <!-- <div class="resultsSymbol">
          <p v-for="result in searchResults">{{result['1. symbol']}}</p>
        </div> -->
        <div class="resultsName">
          <p v-for="result in searchResults" v-on:click="select(result)">{{result['2. name']}} ({{result['1. symbol']}})
            <!-- <button type="button" name="button" v-on:click="select(result)">Select</button> -->
          </p>

        </div>
        <!-- <div class="inputs">
          <input v-for="result in searchResults" type="number" min="0" name="numberOfShares" value="1" v-bind:value="numberOfShares">
        </div> -->
        <!-- <div class="buttons">
          <button v-for="result in searchResults" type="button" v-on:click="select(result)">Select</button>
        </div> -->
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
    margin-top: 20px;

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
    margin-right: 10px;
    /* margin-top: */
  }

  .resultsName p {
    margin: 0px 0px 1px 0px;
    padding: 4px;
    font-weight: bold;
    font-size: 1em;
    text-align: center;
    /* border: 1px solid black; */
    transition: 0.1s;
  }

  .resultsName p:hover {
    background: white;
    color: rgb(7, 37, 62);
    cursor: pointer;
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
    align-self: flex-start;
    /* border: 1px solid black; */

  }

  button {
    width: 80px;
		height: 30px;
    background: rgb(7, 37, 62);
    padding: 5px;
    border:1px solid white;
    /* display: inline-block; */
    /* vertical-align: middle; */
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    user-select: none;
    transition: 0.2s;
    /* margin-bottom: 1px; */
  }

  button:hover {
    font-style: italic;
    cursor: pointer;
    background-color: rgb(36, 75, 105);
  }

</style>
