<template lang="html">
  <div>
    <table class="table" v-if="listItemData">
      <thead>
        <tr>
        <td>Equity Symbol</td>
        <td>Number Of Shares</td>
        <td>Holdings</td>
        <!-- <td>Weight</td> -->
        <td>Price</td>
        <td>24hr Change</td>
          </tr>
      </thead>
      <!-- <div class="row"> -->

      <tbody>

          <tr v-for='share in listItemData'
              :share="share">

            <td>{{share['01. symbol']}}</td>
            <td>{{share['shareNumber']}}</td>
            <td>${{share['shareTotal'] | toFixed(2)}}</td>
            <td>${{share['05. price'] | toFixed(2) }}</td>
            <td id="24hrchange" v-bind:style="getColour(share['10. change percent'])">{{share['10. change percent'] | toFixed(2)}}%</td>
            <img class="removeButton" src="../../public/trash.png" alt="" v-on:click="removeShare(share)">
            <!-- <td><button type="button" name="button" v-on:click="removeShare(share)">remove</button> </td> -->
            <!-- <SharesListItem v-if="listItemData"
                            v-for="share in listItemData"
                            :share="share"
                           ></SharesListItem> -->

            <!-- <td>
              <ListItemChart v-if="selectedChart"></ListItemChart>
            </td> -->


        </tr>

      </tbody>
    <!-- </div> -->

    </table>

  </div>

</template>

<script>

// import SharesListItem from '@/components/SharesListItem.vue'

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
    //     dataObj['shareNumber'] = this.numberOfShares[equity];
      })

    },
  filters: {
    toFixed(value) {
      if (value[value.length-1] === "%") {
        const slicedValue = value.slice(0, value.length-1);          return Number(slicedValue).toFixed(2);
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
    /* color: red; */
    /* padding: 5px; */
  }

  td {
    /* color: red; */
    width: 150px;

  }

  /* tr {
    color: red;
  } */

  thead td{
    background: rgb(36, 75, 105);
    color: white;
    border-bottom: 1px solid white;
    /* margin: 0; */
    padding: 5px;
  }

  .row {
    display: flex;
    flex-direction: column;
  }
  /* tr:nth-child(even) {
    background: rgb(36, 75, 105);
    background: white;
    color: rgb(7, 37, 62);
  } */

  td {
    background: rgb(7, 37, 62);
    padding: 5px;
  }

  tr:hover {
    /* text-decoration: underline; */
    /* cursor: pointer; */
  }

  img {
    width: 30px;
    height: 30px;
  }

  .removeButton {
    /* width: 40px;
    height: 40px; */
    background: white;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-self: center;
    margin-left: 10px;
    /* position: absolute; */
    transition: 0.2s;
  }

  .removeButton:hover {
    background: rgba(222, 133, 126, 1);
    cursor: pointer;
  }

  #24hrchange {
    font-weight: bold;
  }
</style>
