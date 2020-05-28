<template lang="html">
  <div class="">
    <div>

    <p v-for="(shares, key) of numberOfShares" :key="key" :shares="shares">{{key}} {{shares}}</p>

    <p v-if="totalValue">View Total Current Shares Value: ${{result}}</p>
    <button type="button" name="button" v-on:click="totalValue()">View</button>

    <br>

    <button type="button" name="button" v-on:click="openChart()">Open the CHART</button>

    <br>

    <Charts :chartData="chartData" v-if="chartOpen"></Charts>

    <!-- <button v-on:click="testUpdateData">EXTREME TEST DATA</button> -->

</div>

  </div>
</template>

<script>
import Charts from '@/components/Charts.vue'
import moment from 'moment'
import { eventBus } from '../main.js';

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
      chartData: {},
      apiData: {}
    }
  },
  mounted: function mounted() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FB&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['FB'] = share['Time Series (Daily)'];
      this.prepareData('FB', share['Time Series (Daily)'], this.apiData);
      this.chartData = this.apiData;
      this.latestValue['FB'] = this.userShares['FB'][Object.keys(this.userShares['FB']).shift()]
    })

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['IBM'] = share['Time Series (Daily)'];
      this.prepareData('IBM', share['Time Series (Daily)'], this.apiData);
      this.chartData = this.apiData;
      this.latestValue['IBM'] = this.userShares['IBM'][Object.keys(this.userShares['IBM']).shift()]
    })

    fetch('http://localhost:3000/api/shares/')
    .then(res => res.json())
    .then(data => {
      const { _id, ...shares } = data[0];
      this.numberOfShares = shares;
    });

    eventBus.$on('filter-dates', ({startDate, endDate}) => {
      this.updateData(startDate, endDate);

    })

  },
  computed: {
  },
  methods: {
    totalValue(){
      let total = 0
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
      chartDataObject[share] = {};
      Object.entries(dailyData).forEach(([date, info]) => {
        let newDate = moment(date).format("DD MM YYYY")
        chartDataObject[share][date] = Number(info['4. close']);
        return chartDataObject;
      })
    },
    testUpdateData(){
      this.updateData('2020-05-01', '2020-05-05');
      // console.log(updatedResult);
    },
    updateData(startDate, endDate){
      let newChartData = {};

      Object.keys(this.chartData).forEach((key) => {
        newChartData[key] = {};
      });

      Object.entries(this.chartData).forEach(([equity, dates]) => {
        Object.entries(dates).forEach(([date, price]) => {
          if ((date >= startDate) && (date <= endDate)) {
            newChartData[equity][date] = price;
          }
          return this.chartData = newChartData;
        })
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
