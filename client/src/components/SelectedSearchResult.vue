<template lang="html">
  <div class="inputView">
    <div class="shareView">
      <p>{{selectedShare['2. name']}} ({{selectedShare['1. symbol']}})</p>
    </div>
    <div class="numberInput">
      <p class="minus" v-on:click="minus">-</p>
    	<input type="text" value="1" v-model="inputAmount"/>
    	<p class="plus" v-on:click="plus">+</p>
    </div>
    <button type="button" name="button" @click="bookIt">BookIt</button>
  </div>
</template>

<script>

import {eventBus} from '@/main.js'
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
    },
    bookIt() {
      let shareSymbol = this.selectedShare['1. symbol'];
      let newShare = { [shareSymbol]: this.inputAmount };
      eventBus.$emit('selected-share', newShare);
    }
  }
}
</script>

<style lang="css" scoped>

  .inputView {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .shareView {
    display: flex;
    flex-direction: row;
  }

  .shareView p {
    margin: 20px 10px;
    font-size: 18px;
    font-weight: bold;
  }

  .numberInput {
    display: flex;
    /* flex-direction: row; */
    /* align-items: center; */
    /* justify-content: center; */
    /* align-content: center; */
  }

  .numberInput input{
    height:24px;
    width: 60px;
    text-align: center;
    font-size: 18px;
  	border: 1px solid white;
    display: inline-block;
    vertical-align: middle;
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
    padding: 2.5px 15px 0px;
    border:1px solid white;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-weight: bold;
    user-select: none;
    transition: 0.2s;
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

  button {
    width: 170px;
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
    background-color: rgb(36, 75, 105);
  }


</style>
