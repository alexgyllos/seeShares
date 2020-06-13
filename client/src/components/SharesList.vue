<template lang="html">
  <div>
    <table class="table table-hover" v-if="listItemData">
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
      <tbody>
        <tr v-for='share in listItemData'
            :share="share">

          <td>{{share['01. symbol']}}</td>
          <td>{{share['shareNumber']}}</td>
          <td>${{share['shareTotal'] | toFixed(2)}}</td>
          <td>${{share['05. price'] | toFixed(2) }}</td>
          <td id="24hrchange" v-bind:style="getColour(share['10. change percent'])">{{share['10. change percent'] | toFixed(2)}}%</td>
          <!-- <SharesListItem v-if="listItemData"
                          v-for="share in listItemData"
                          :share="share"
                         ></SharesListItem> -->

        </tr>
      </tbody>
    </table>

  </div>

</template>

<script>

// import SharesListItem from '@/components/SharesListItem.vue'
export default {
  name: 'SharesList',
  props: ['listData', 'numberOfShares'],
  data() {
    return {
      listItemData: null
    }
  },
  methods: {
    getColour(num) {
      const formattedNum = num.slice(0, num.length-1);
    
      return formattedNum > 0 ? "color:green" : "color:red";
    }

    //   return num > 0 ? "color:red" : "color:green"
    // }
  },
  // data(){
  //   return {
  //
  //   }
  // },
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
            const slicedValue = value.slice(0, value.length-1);
            return Number(slicedValue).toFixed(2);
          }
          else {
            return Number(value).toFixed(2);
          }
        }
    },
  components: {
    // SharesListItem
  }
}
</script>

<style lang="css" scoped>



  td {

  }

  tr {
    border: 1px solid white;
  }

  #24hrchange {
    font-weight: bold;
  }
</style>
