<template lang="html">
  <div class="item">
    <div class="resultsSymbol">
      <p>{{result['1. symbol']}}</p>
    </div>
    <div class="resultsName">
      <p>{{result['2. name']}}</p>
    </div>
    <div class="inputs">
      <input type="number" min="0" name="numberOfShares" value="1" v-bind:value="numberOfShares">
    </div>
    <div class="buttons">
      <button type="button" v-on:click="bookIt(numberOfShares)">Book it</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResultsItem',
  props: ['result']
}
</script>

<style lang="css" scoped>

.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.resultsSymbol {
  display: flex;
  /* flex-direction: column; */
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
  width: 30px;
  text-align: center;
  margin: 0px 10px;
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
