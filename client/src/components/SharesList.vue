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
          <td>${{share['shareTotal']}}</td>
          <td>${{share['05. price']}}</td>
          <td v-bind:style="getColour(share['10. change percent'])">{{share['10. change percent']}}</td>
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
      return num > 0 ? "color:green" : "color:red"
    }
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
</style>
