<template lang="html">
  <div class="">
    <p>{{selectedShare['1. symbol']}}</p>
    <p>{{selectedShare['2. name']}}</p>
    <div class="numberInput">
      <p class="minus" v-on:click="minus">-</p>
    	<input type="text" value="1" v-model="inputAmount"/>
    	<p class="plus" v-on:click="plus">+</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectedSearchResult',
  props: ['selectedShare'],
  data() {
    return {
      inputAmount: 1
    }
  },
  methods: {
    plus() {
      this.inputAmount += 1;
    },
    minus() {
      if (this.inputAmount >= 2) {
      this.inputAmount -= 1;
      }
    }
  }
}
</script>

<style lang="css" scoped>

  .numberInput {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  .numberInput input{
    height:24px;
    width: 60px;
    text-align: center;
    font-size: 18px;
  	border: 1px solid white;
  	/* border-radius:4px; */
    display: inline-block;
    vertical-align: middle;
    /* margin: 0px 5px; */
    align-self: center;
    user-select: none;
    color: white;
  }

  input {
    user-select: none;
    background: rgb(7, 37, 62);
  }

  .minus, .plus{
    width:20px;
		height:23.5px;

    background: rgb(7, 37, 62);
    /* border-radius:4px; */
    padding: 2.5px 15px 0px;
    border:1px solid white;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    color: white;
    /* font-size: 20px; */
    font-weight: bold;
    user-select: none;
  }

  .minus:hover, .plus:hover {
    cursor: pointer;
    background-color: rgb(36, 75, 105);
  }

  .plus {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .minus {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
</style>
