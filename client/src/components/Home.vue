<template lang="html">
  <div class="">
    <div>

    <p v-for="share of numberOfShares">{{share}}</p>

    <p v-if="totalValue">View Total Current Shares Value: ${{result}}</p>
    <button type="button" name="button" v-on:click="totalValue()">View</button>


    <button type="button" name="button" v-on:click="openChart()">Open the CHART</button>
    <Charts :chartData="chartData" v-if="chartOpen"></Charts>

      <button type="button" name="button" v-on:click="prepareData()">PREPARE THE DATA</button>

</div>

  </div>
</template>

<script>
import Charts from '@/components/Charts.vue'
import moment from 'moment'

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
      chartOpen: false,
      chartData: {}
    }
  },
  mounted: function mounted() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FB&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['FB'] = share['Time Series (Daily)'];
      this.prepareData('FB', share['Time Series (Daily)'], this.chartData);
      this.latestValue['FB'] = this.userShares['FB'][Object.keys(this.userShares['FB']).shift()]
    })

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['IBM'] = share['Time Series (Daily)'];
      this.prepareData('IBM', share['Time Series (Daily)'], this.chartData);
      this.latestValue['IBM'] = this.userShares['IBM'][Object.keys(this.userShares['IBM']).shift()]
    })

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
    prepareData(share, dailyData, chartDataObject){
      // this.prepareDates(dailyData, chartDataObject)
      chartDataObject[share] = {};
      Object.entries(dailyData).forEach(([date, info]) => {
        let newDate = moment(date).format("DD MM YYYY")
        chartDataObject[share][newDate] = Number(info['4. close']);

        return chartDataObject;
      })
    },
    prepareDates(dailyData, chartDataObject){
      chartDataObject['dates'] = [];
      Object.keys(dailyData).forEach((date) => {
        chartDataObject['dates'].push(date)
      })
      return chartDataObject['dates']
    },
    configureDates(){

    }
  },
  components: {
    Charts
  }
}
</script>

<style lang="css" scoped>
</style>
