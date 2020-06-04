<template lang="html">
  <div class="">
    <h1>SHARE/\/BOOK</h1>

      <div>

      <p v-for="(shares, key) of numberOfShares" :key="key" :shares="shares">{{key}} {{shares}}</p>

      <PieChart :pieChartData="pieChartData" v-if="pieData"></PieChart>

      <p v-if="totalValue">View Total Current Shares Value: ${{result}}</p>
      <button type="button" name="button" v-on:click="totalValue()">View</button>

      <br>

      <button type="button" name="button" v-on:click="openChart()">Open the CHART</button>

      <br>

      <Charts :chartData="chartData" v-if="chartOpen"></Charts>
    </div>

  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import Charts from '@/components/Charts.vue'
import PieChart from '@/components/PieChart.vue'
import moment from 'moment'
import { eventBus } from '../main.js';
import SharesServices from '../../services/SharesServices.js'

export default {
  name: 'Home',
  data() {
    return {
      numberOfShares: null,
      total: null,
      latestValue: {},
      componentLoaded: false,
      result: 0,
      chartOpen: false,
      chartData: {},
      pieChartData: {},
      pieData: false
    }
  },
  mounted() {
    this.loadSharesData();
    // this.prearePieChartData();
  },
  methods: {
    totalValue(){
      let total = 0
      Object.keys(this.numberOfShares).forEach((share) => {
        Object.keys(this.latestValue).forEach(key => {
          if (share === key) {
            total += this.numberOfShares[share] * this.latestValue[key]
          }
        })
      })
      return this.result = total ;
    },
    async loadSharesData() {
      const userData = await SharesServices.getUserData();
      const { _id, ...shares } = userData[0];
      this.numberOfShares = shares;
      const sharePromises = await SharesServices.getSharesPromises(shares)
      const quotePromises = await this.getQuoteData(shares);
      const results = await Promise.all(sharePromises);
      console.log(results);
      this.prepareData(results, this.chartData);
    },
    openChart(){
      return this.chartOpen = true;
    },
    prepareData(results, chartDataObject) {
      results.map(resultObj => {
        const {
          '2. Symbol': shareName,
          '3. Last Refreshed': lastRefreshed,
        } = resultObj['Meta Data'];
        chartDataObject[shareName] = {};
        Object.entries(resultObj['Time Series (Daily)']).forEach(([date, info]) => {
          chartDataObject[shareName][date] = Number(info['4. close']);
          this.latestValue[shareName] = date === lastRefreshed ? Number(info['4. close']) : this.latestValue[shareName]
          return chartDataObject
        })
      })
      this.totalValue();
      this.prearePieChartData();
    },
    async getQuoteData(numberOfShares) {
      const quotePromises = await SharesServices.getQuotePromises(numberOfShares);
      const results = await Promise.all(quotePromises);
      console.log(results);
    },

    prearePieChartData(){
      Object.keys(this.numberOfShares).forEach((share) => {
        Object.keys(this.latestValue).forEach(key => {
          if (share === key) {
            let newSeries = {
              name: key,
              y: this.numberOfShares[share] * this.latestValue[key]
            }
            this.pieChartData[share] = newSeries;
          }
        })
      })
      this.pieData = true;
    }
    },
  components: {
    Charts,
    PieChart
  }
}
</script>

<style lang="css" scoped>
</style>
