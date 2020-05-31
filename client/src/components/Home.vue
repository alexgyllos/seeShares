<template lang="html">
  <div class="">
    <h1>SHARE/\/BOOK</h1>
    <div>

    <p v-for="(shares, key) of numberOfShares" :key="key" :shares="shares">{{key}} {{shares}}</p>

    <button type="button" name="button" v-on:click="loadChart()">Load Chart</button>
    <div id="pieChart">
      <highcharts :options="pieChart"></highcharts>
    </div>


    <p v-if="totalValue">View Total Current Shares Value: ${{result}}</p>
    <button type="button" name="button" v-on:click="totalValue()">View</button>

    <br>

    <button type="button" v-on:click="loadSharesData()">Load Shares Data</button>

    <button type="button" name="button" v-on:click="openChart()">Open the CHART</button>

    <br>

    <Charts :chartData="chartData" v-if="chartOpen"></Charts>

    <!-- <button v-on:click="testUpdateData">EXTREME TEST DATA</button> -->

</div>

  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import Charts from '@/components/Charts.vue'
import moment from 'moment'
import { eventBus } from '../main.js';
import SharesServices from '../../services/SharesServices.js'


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
      apiData: {},
      pieChart: {
        type: 'pie',
        series: [{
          name: 'Value',
          colorByPoint: true,
          type: 'pie',
          data: [{
            name: 'FB',
            y: 30
          },
          {
            name: 'IBM',
            y: 70
          },
          {
            name: 'BA',
            y: 10
          }]
        }]
        // title: {
        //   text: 'Shares Owned'
        // },
        // plotOptions: {
        //   pie : {
        //     allowPointSelect: true,
        //     cursor: 'pointer',
        //     dataLabels: {
        //       enabled: true
        //     }
        //   }
        // },
        // series: [{
        //   name: 'Shares',
        //   colorByPoint: true,
        //   data: [{
        //     name: 'FB',
        //     y: 100,
        //     sliced: true,
        //     selected: true
        //   }]
        // }]
      }
    }
  },
  mounted() {
    this.loadSharesData();
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
      const results = await Promise.all(sharePromises);
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
    loadChart() {
      let newSeries;
    },


    async loadSharesData() {
      const userData = await SharesServices.getUserData();
      const { _id, ...shares } = userData[0];
      this.numberOfShares = shares;
      const sharePromises = await SharesServices.getSharesPromises(shares)
      const results = await Promise.all(sharePromises);
      this.prepareData(results, this.chartData);

      }
    },
  components: {
    Charts
  }
}
</script>

<style lang="css" scoped>
</style>
