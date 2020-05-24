<template lang="html">
  <div class="">
    <div v-if="contentLoaded">

    <p v-if="totalValue">View Total Current Shares Value: {{result}}</p>
    <button type="button" name="button" v-on:click="totalValue()">View</button>

    <Charts :latestValue="latestValue"></Charts>

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
      result: 0
    }
  },
  mounted: function mounted() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['FB'] = share;
      let temp = share['Time Series (30min)']
      this.latestValue['FB'] = temp[Object.keys(temp).pop()]
    })

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['IBM'] = share;
      let temp = share['Time Series (30min)']
      this.latestValue['IBM'] = temp[Object.keys(temp).pop()]
    })

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => this.userShares['IBM'] = share)

    fetch('http://localhost:3000/api/shares/')
    .then(res => res.json())
    .then(data => this.numberOfShares = data[0]);

    this.componentLoaded = true;

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
    }
  },
  components: {
    Charts
  }
}
</script>

<style lang="css" scoped>
</style>
