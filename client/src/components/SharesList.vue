<template lang="html">
  <div>
    <table class="table" v-if="listItemData">
      <thead>
        <tr>
        <td>Equity Symbol</td>
        <td>Number Of Shares</td>
        <td>Holdings</td>
        <td>Price</td>
        <td>24hr Change</td>
          </tr>
      </thead>

      <tbody>

          <tr v-for='share in listItemData'
              :share="share">

            <td>{{share['01. symbol']}}</td>
            <td>{{share['shareNumber']}}</td>
            <td>${{share['shareTotal'] | toFixed(2)}}</td>
            <td>${{share['05. price'] | toFixed(2) }}</td>
            <td id="24hrchange" v-bind:style="getColour(share['10. change percent'])">{{share['10. change percent'] | toFixed(2)}}%</td>
            <td><button type="button" name="button" v-on:click="removeShare(share)">remove</button> </td>

        </tr>

      </tbody>

    </table>

  </div>

</template>

<script>

import ListItemChart from '@/components/ListItemChart.vue'
import { eventBus } from '../main.js';

export default {
  name: 'SharesList',
  props: ['listData', 'numberOfShares'],
  data() {
    return {
      listItemData: null,
      selectedChart: true
    }
  },
  methods: {
    getColour(num) {
      const formattedNum = num.slice(0, num.length-1);

      return formattedNum > 0 ? "color:green" : "color:red";
    },
    removeShare({ '01. symbol': removedShare }) {
      eventBus.$emit('removed-share', removedShare)
    }
  },
  mounted() {
    this.listItemData = this.listData.map(dataObj => {
        const {
          '01. symbol': equity,
          '05. price': price
        } = dataObj;
        dataObj['shareNumber'] = this.numberOfShares[equity];
        dataObj['shareTotal'] =  this.numberOfShares[equity] * price;
        return dataObj;
      })

    },
  filters: {
    toFixed(value) {
      if (value[value.length-1] === "%") {
        const slicedValue = value.slice(0, value.length-1);
        return Number(slicedValue).toFixed(2);
        }
          else {
            return Number(value).toFixed(2);
          }
    }
  },
  components: {
        ListItemChart
  }
}
</script>

<style lang="css" scoped>

  .table {

  }

  td {

    width: 150px;

  }



  thead td{
    background: rgb(36, 75, 105);
    color: white;
    border-bottom: 1px solid white;

    padding: 5px;
  }

  .row {
    display: flex;
    flex-direction: column;
  }


  td {
    background: rgb(7, 37, 62);
    padding: 5px;
  }

  tr:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  #24hrchange {
    font-weight: bold;
  }
</style>
