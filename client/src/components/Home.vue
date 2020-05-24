<template lang="html">
  <div class="">
    <div>

    <p v-if="totalValue">View Total Current Shares Value: {{result}}</p>
    <button type="button" name="button" v-on:click="totalValue()">View</button>


    <button type="button" name="button" v-on:click="openChart()">Open the CHART</button>
    <Charts :latestValue="latestValue" v-if="chartOpen"></Charts>

</div>

  </div>
</template>

<script>
import Charts from '@/components/Charts.vue'

export default {
  name: 'Home',
  data() {
    return {
      userShares: {},
      numberOfShares: null,
      total: null,
      latestValue: {},
      componentLoaded: false,
      result: 0,
      chartOpen: false
    }
  },
  mounted: function mounted() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FB&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['FB'] = share;
      let temp = share['Time Series (Daily)']
      this.latestValue['FB'] = temp[Object.keys(temp).pop()]
    })

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['IBM'] = share;
      let temp = share['Time Series (Daily)']
      this.latestValue['IBM'] = temp[Object.keys(temp).pop()]
    })

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => this.userShares['IBM'] = share)

    fetch('http://localhost:3000/api/shares/')
    .then(res => res.json())
    .then(data => this.numberOfShares = data[0]);


    // this.totalValue()
  },
  computed: {
    // totalValue(){
    //   let total = 0
    //   Object.keys(this.numberOfShares).forEach((share) => {
    //     Object.keys(this.latestValue).forEach(key => {
    //       if (share === key) {
    //         total += this.numberOfShares[share] * this.latestValue[key]['4. close']
    //       }
    //     })
    //   })
    //
    //   return this.result = total ;
    // }
  },
  methods: {
    totalValue(){
      let total = 0
      // if (this.contentLoaded === false) {return total = 0}
      // else {
      Object.keys(this.numberOfShares).forEach((share) => {
        Object.keys(this.latestValue).forEach(key => {
          if (share === key) {
            total += this.numberOfShares[share] * this.latestValue[key]['4. close']
          }
        })
      })

      return this.result = total ;
    },
    openChart(){
      return this.chartOpen = true;
    },

  },
  components: {
    Charts
  }
}
</script>

<style lang="css" scoped>
</style>
